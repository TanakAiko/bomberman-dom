import store from "../store/store-app.js"
const handleMove = (e) => {
    if (canPass(e)) {
        console.log("CAN PASS")
        if (store.state.timerDebounce === 0 && (e.key).includes("Arrow")) {
            let player 
            store.state.players.forEach((p) => {
                if (p.name === store.state.Nickname) {
                    player = p
                }
            })
            store.state.socket.Send({
                type: "action",
                nickname: store.state.Nickname,
                content: e.key,
            })
        }
    }

    if (e.key === " ") {
        store.state.socket.Send({
            type: "action",
            nickname: store.state.Nickname,
            content: " ",
        })
    }
}

const canPass = (event) => {
    return (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === " ");
}

export default handleMove;