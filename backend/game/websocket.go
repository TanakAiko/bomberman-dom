package game

import (
	"bomberman/utils"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gorilla/websocket"
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	BroadcastChannel   = make(chan Payload)
	FIRST_TIMER_START  = false
	SECOND_TIMER_START = false
	GAME_TIMER_START   = false
)

func NewGame() Game {
	return Game{
		Rooms: Room{
			Grid: utils.Matrix(),
		},
	}
}

func (g *Game) HandleWS(w http.ResponseWriter, r *http.Request) {
	// handle websocket connection
	conn, err := upgrader.Upgrade(w, r, nil)
	fmt.Println("CONNECTION")

	if err != nil {
		http.Error(w, "could not upgrade connection", http.StatusBadRequest)
		return
	}

	for {
		// read message from connection
		var payload Payload
		err := conn.ReadJSON(&payload)
		if err != nil {
			g.HandleUserDisconnection(conn)
			break
		}
		g.HandleGameRequest(payload, conn)
	}
}

func (g *Game) HandleGameRequest(payload Payload, conn *websocket.Conn) {
	fmt.Println("\n\npayload(l58): ", payload)
	// handle user connection
	switch payload.Type {
	case "join":
		// join room
		err := g.HandleJoinRoom(payload, conn)
		if err != nil {
			BroadcastChannel <- Payload{
				Type:    "error",
				Content: err.Error(),
				Sender:  payload.Sender,
			}

		} else {
			BroadcastChannel <- Payload{
				Type:    "users-joinded",
				Content: g.ConcatAllPlayers(),
				Sender:  payload.Sender,
			}
		}

	case "action":
		// move player
		fmt.Println("ACTION: ", payload)
		BroadcastChannel <- Payload{
			Type:    "action",
			Content: payload.Content,
			Sender:  payload.Sender,
		}

	case "newMessage":
		BroadcastChannel <- Payload{
			Type:    "receiveMessage",
			Content: payload.Content,
			Sender:  payload.Sender,
		}

	case "looseLife":
		fmt.Println("LOOSE_LIFE: ", payload)
		BroadcastChannel <- Payload{
			Type:   "looseLife",
			Sender: payload.Sender,
		}

	case "upScoreWall":
		fmt.Println("UP_SCORE_WALL: ", payload)
		BroadcastChannel <- Payload{
			Type:   "upScoreWall",
			Sender: payload.Sender,
		}

	case "upScoreEnnemy":
		fmt.Println("UP_SCORE_ENNEMY: ", payload)
		BroadcastChannel <- Payload{
			Type:   "upScoreEnnemy",
			Sender: payload.Sender,
		}

	default:
	}
}

func (g *Game) HandleUserDisconnection(conn *websocket.Conn) {
	// handle user disconnection
	for i, player := range g.Rooms.Players {
		if player.Connection == conn {
			g.Rooms.Players = append(g.Rooms.Players[:i], g.Rooms.Players[i+1:]...)
			BroadcastChannel <- Payload{
				Type:    "leave",
				Content: player.Nickname,
				Sender:  player.Nickname,
			}
			break
		}
	}
}

func (g *Game) HandleJoinRoom(payload Payload, conn *websocket.Conn) error {
	// check if game already started
	if SECOND_TIMER_START {
		return errors.New("game already started")
	}
	// check if user is in room
	err := g.IsUserInRoom(payload.Sender)
	if err != nil {
		return err
	}

	// handle join room
	newPlayer := Player{
		Nickname:   payload.Sender,
		Connection: conn,
	}

	// add player to room
	g.Rooms.Players = append(g.Rooms.Players, newPlayer)
	if len(g.Rooms.Players) == 2 {
		fmt.Println("START TIMER")
		go g.FirstTimer()
	}
	return nil
}

func (g *Game) ConcatAllPlayers() string {
	// concat all players
	var players []string
	for _, player := range g.Rooms.Players {
		players = append(players, player.Nickname)
	}
	return strings.Join(players, ",")
}

// 20s timer
func (g *Game) FirstTimer() {
	duration := 2
	FIRST_TIMER_START = true
	for range time.Tick(1 * time.Second) {
		if duration < 0 || len(g.Rooms.Players) == 4 {
			go g.SecondTimer()
			return
		}
		BroadcastChannel <- Payload{
			Type:    "timer 1",
			Content: fmt.Sprintf("%d", duration),
			Sender:  "server",
		}
		duration--
	}
}

// 10s timer
func (g *Game) SecondTimer() {
	SECOND_TIMER_START = true
	fmt.Println("FROM SECOND TIMER")
	duration := 1
	for range time.Tick(1 * time.Second) {
		if duration < 0 {
			g.SendMap()
			go g.GameTimer()
			return
		}
		BroadcastChannel <- Payload{
			Type:    "timer 2",
			Content: fmt.Sprintf("%d", duration),
			Sender:  "server",
		}
		duration--
	}
}

func (g *Game) GameTimer() {
	GAME_TIMER_START = true
	fmt.Println("FROM GAME TIMER")

	// 3 minutes = 180 seconds
	duration := 180

	for range time.Tick(1 * time.Second) {
		if duration < 0 {
			BroadcastChannel <- Payload{
				Type:    "game_over",
				Content: "timer is 0",
				Sender:  "server",
			}
			return
		}

		minutes := duration / 60
		seconds := duration % 60

		// Format time as MM:SS
		timerString := fmt.Sprintf("%d:%02d", minutes, seconds)

		// Broadcast the remaining time
		BroadcastChannel <- Payload{
			Type:    "game_timer",
			Content: timerString,
			Sender:  "server",
		}

		duration--
	}
}

func (g *Game) SendMap() {
	g.UpdateMap()
	payload := Payload{
		Type:   "map",
		Map:    g.Rooms.Grid,
		Sender: "server",
	}
	BroadcastChannel <- payload
}

func (g *Game) UpdateMap() {
	nb := 1
	for _, position := range PLAYERS_POSITIONS {
		if nb <= len(g.Rooms.Players) {
			g.Rooms.Grid[position.Y][position.X] = 'p'
			nb++
		}
	}
}
