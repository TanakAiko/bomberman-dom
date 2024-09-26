import Store from "../../../domino/_lib/core/stateManager/store.js"
import message from "../components/chatBox.js";
import reducer from "./reducer.js"

const store = new Store({
    reducer,
    state: {
        Nickame: "",
        socket: null,
        players: [],
        users: [],
        map: [],
        divs: [],
        walls: [],
        timer: 20,
        messages: [],
        Message: "",
        timerDebounce: 0,
        gameTimer: "3:00",
    }
});

export default store;