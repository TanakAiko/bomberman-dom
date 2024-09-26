package game

import (
	"errors"

	"github.com/gorilla/websocket"
)

var PLAYERS_POSITIONS = []Position{
	{1, 1},
	{13, 1},
	{1, 11},
	{13, 11},
}


type Position struct {
	X int
	Y int
}

type Payload struct {
	Type    string `json:"type"`
	Content string `json:"content"`
	Sender  string `json:"nickname"`
	Map    [][]rune `json:"map"`
}

type Player struct {
	Nickname   string
	Connection *websocket.Conn
}

type Room struct {
	Players []Player
	Grid    [][]rune
}

type Game struct {
	Rooms Room
}

func (g *Game) IsUserInRoom(nickname string) error {
	// check if user is in room
	for _, player := range g.Rooms.Players {
		if player.Nickname == nickname {
			return errors.New("user is already in room")
		}
	}
	return nil
}
