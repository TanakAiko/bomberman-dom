package main

import (
	"bomberman/game"
	"fmt"
	"log"
	"net/http"
	"sync"
)

func main() {
	// create new game
	NewGame := game.NewGame()

	mux := http.NewServeMux()
	mux.HandleFunc("/ws", NewGame.HandleWS)
	var mutex sync.Mutex

	go func() {
		for {
			mutex.Lock()
			payload := <-game.BroadcastChannel
			mutex.Unlock()

			for _, player := range NewGame.Rooms.Players {
				err := player.Connection.WriteJSON(payload)
				if err != nil {
					fmt.Println("could not write message to connection", err)
				}
			}
		}
	}()

	log.Println("server is running on: http://localhost:8080")
	http.ListenAndServe(":8080", mux)
}
