import Store from "../../../domino/_lib/core/stateManager/store.js"
import reducer from "./reducer.js"

export const initialState = {
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
    endMessage: "",
}

const store = new Store({
    reducer,
    state: initialState,
});

export default store;