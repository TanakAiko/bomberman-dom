const reducer = (state, action) => {
    switch (action.type) {
        case "CONNECT_SOCKET":
            return { ...state, socket: action.payload.socket }
        case "SET_TIMER":
            return { ...state, timer: action.payload.timer }
        case "SET_USERS":
            return { ...state, users: action.payload.users }
        case "SET_PLAYERS":
            return { ...state, players: [...state.players || [], action.payload.player] }
        case "ADD_MSG":
            return { ...state, messages: [...state.messages || [], action.payload] }
        case "SET_GAME_TIMER":
            return { ...state, gameTimer: action.payload.timer }
        case "LOOSE_LIFE":
            return {
                ...state,
                players: state.players.map(player => {
                    if (player.name === action.payload.nickname) {
                        player.decrementLife();
                    }
                    return player;
                })
            }
        default:
            return state;
    }
}

export default reducer;