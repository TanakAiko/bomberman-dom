const waitingRoom = () => {
    const component = `
    <mini>
        <div id="lobby-screen">
            <h2 className="text-2xl text-white mb-4">Lobby</h2>
            <div id="player-list" className="grid grid-cols-2 gap-4 mb-4">
                {users.map(player => createUserWaitingRoom(player)).join("")}
            </div>
            <div id="lobby-timer" className="text-3xl text-white text-center mb-4">{timer}</div>
            <button id="start-game-btn" className="btn bg-green-500 text-white px-8 py-4 rounded-lg text-xl w-full mb-4" disabled>Démarrer la partie</button>
        </div>
    </mini>
    `

    const context = {
        WaitingRoom: () => component,
    }

    return context
}

export default waitingRoom