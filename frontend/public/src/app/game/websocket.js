import store from "../store/store-app.js";
import router from "../../../index.js";
import { UserJoined, constructMap, playerMove, playerBoom } from "./todo.js";
import handleMove from "./move.js";


class GameWebSocket {
    constructor() {
        this.socket = new WebSocket("ws://localhost:8080/ws");
        this.socket.onopen = () => {
            const nickname = store.state.Nickname;
            this.Send({ type: "join", nickname: nickname });
        }
        this.handleReceive();
    }

    handleReceive() {
        this.socket.onmessage = (event) => {
            const payload = JSON.parse(event.data);
            switch(payload.type) {

                // when timer 1 is received
                case "timer 1":
                    store.dispatch({type: "SET_TIMER", payload: {timer: payload.content }});
                    break;

                // when timer 2 is received
                case "timer 2":
                    router.navigateTo("/pre-game");
                    store.dispatch({type: "SET_TIMER", payload: {timer: payload.content }});
                    break;

                // when timer 3 is received
                case "game_timer":
                    store.dispatch({ type: "SET_GAME_TIMER", payload: { timer: payload.content } });
                    break

                // when error comes from server
                case "error":
                    break;

                // when a new player joins the game
                case "users-joinded":
                    if (store.state.path != "/waiting-room") router.navigateTo("/waiting-room");
                    UserJoined(payload);
                    break;

                // when we receive map
                case "map":
                    constructMap(payload);
                    router.navigateTo("/game", () => {
                        document.addEventListener("keydown", (e) => {
                            handleMove(e);
                        })
                    })
                    break;

                // when we receive an action
                case "action":
                    (payload.content).includes("Arrow") && playerMove(payload);
                    payload.content === " " && playerBoom(payload);
                    break;

                // when we receive a message
                case "receiveMessage":
                    store.dispatch({ type: "ADD_MSG", payload: payload })
                    break;

                // when one player leaves the game
                case "leave":
                    break;
                default:
                    break;
            }
        }
    }

    Send(payload) {
        this.socket.send(JSON.stringify(payload));
    }
}

export default GameWebSocket;