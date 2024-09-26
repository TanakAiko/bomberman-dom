package utils

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

func Matrix() [][]rune {

	matrix := [][]rune{
		{'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'},
		{'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'b'},
		{'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'},
		{'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'b'},
		{'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'},
		{'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'b'},
		{'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'},
		{'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'b'},
		{'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'},
		{'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'b'},
		{'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b', 'c', 'b'},
		{'b', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'b'},
		{'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'},
	}

	for x, row := range matrix {
		for y, col := range row {
			if col == 'c' && Corner(x, y) == "none" {
				matrix[x][y] = randomize()
			}
		}
	}

	return matrix
}


func Corner(x, y int) string {
	switch true {
	// Will be usefull for players to spawn
	case (x == 1 && y == 1):
		return "top_left"
	case (x == 1 && y == 13):
		return "top_right"
	case (x == 11 && y == 1):
		return "bottom_left"
	case (x == 11 && y == 13):
		return "bottom_right"

	// Neighbors to let enough space to players.
	case (x == 1 && y == 2) ||
		(x == 2 && y == 1) ||
		(x == 1 && y == 12) ||
		(x == 2 && y == 13) ||
		(x == 11 && y == 2) ||
		(x == 10 && y == 1) ||
		(x == 11 && y == 12) ||
		(x == 10 && y == 13):
		return "neighbors"

	default:
		return "none"
	}
}


func randomize() rune {
	max := big.NewInt(100)
	randInt, err := rand.Int(rand.Reader, max)
	if err != nil {
		fmt.Println("Error generating random number:", err)
	}

	switch true {
	case randInt.Int64() < 50:
		return 'm'

		// 10% chance to spawn a power up.
	case randInt.Int64()%5 == 0:
		switch true {
		case randInt.Int64()%2 == 0:
			return 'x'
		case randInt.Int64()%3 == 0:
			return 'y'
		default:
			return 'z'
		}

	default:
		return 'c'
	}
}

