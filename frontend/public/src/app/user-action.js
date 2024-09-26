import store from "./store/store-app.js";
import GameWebSocket from "./game/websocket.js";
import router from "../../index.js";
import playerItem from "../app/components/player-item.js";
import message from "../app/components/chatBox.js";
import playerDetail from "./components/playerBox.js";

const USER_ACTIONS = {
    handleChange: (e) => {
        if (e.target.value) { store.state.Nickname = e.target.value }
    },
    SubmitUserInfos: () => {
        if (store.state.Nickname) {
            store.dispatch({ type: "CONNECT_SOCKET", payload: { socket: new GameWebSocket() } });
        }
    },
    createUserWaitingRoom: (user) => playerItem(user).PlayerItem(),
    handleChangeMsg: (e) => {
        if (e.target.value) { 
            store.state.Message = e.target.value 
            e.target.value = ""
        }
    },
    SubmitNewMsg: () => {
        if (store.state.Nickname) {
            if (store.state.Nickname) {
                store.state.socket.Send({
                    type: "newMessage",
                    nickname: store.state.Nickname,
                    content: store.state.Message,
                })
            }
        }
    },
    setMessages: (Messages) => {
        return Messages.map((msg) => message(msg).Message()).join("")
    },
    setPlayers: (Players) => {
        return Players.map((player) => playerDetail(player).PlayerDetail()).join("")
    },
}

export default USER_ACTIONS;