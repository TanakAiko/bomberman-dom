import store from "./src/app/store/store-app.js"
import Domino from "./domino/_lib/core/runtime/runtime.js"
import Router from "./domino/_lib/core/router/router.js"
import player from "./src/app/components/name-enter.js"
import waitingRoom from "./src/app/components/waiting-room.js"
import preGame from "./src/app/components/pre-game.js"
import game from "./src/app/components/game.js"
import USER_ACTIONS from "./src/app/user-action.js"


// Framework instance with store
const domino = new Domino(store)
const root = document.getElementById("game-container")


// Components instances
const playerContext = player()
const playerComponent = playerContext.Player()

const waitingRoomContext = waitingRoom()
const waitingRoomComponent = waitingRoomContext.WaitingRoom()

const preGameContext = preGame()
const preGameComponent = preGameContext.PreGame()

const GameContext = game()
const GameComponent = GameContext.Game()

// Define routes
const routes = {
    "/": {
        context: { ...playerContext,  ...USER_ACTIONS}, 
        component: playerComponent
    },

    "/waiting-room": {
        context: { ...waitingRoomContext, ...USER_ACTIONS }, 
        component: waitingRoomComponent
    },

    "/pre-game": {
        context: { ...preGameContext, ...USER_ACTIONS }, 
        component: preGameComponent
    },

    "/game": {
        context: { ...GameContext, ...USER_ACTIONS }, 
        component: GameComponent
    }
}

// Router instance
const router = new Router(domino, routes, root)
export default router