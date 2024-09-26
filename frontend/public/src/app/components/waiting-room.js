const waitingRoom = () => {
    const component = `
    <mini>
        <div id="lobby-screen">
            <h2 className="text-2xl text-white mb-4">Lobby</h2>
            <div id="player-list" className="grid grid-cols-2 gap-4 mb-4">
                {users.map(player => createUserWaitingRoom(player)).join("")}
            </div>
            <div id="lobby-timer" className="text-3xl text-white text-center mb-4">{timer}</div>
        </div>

        <div>
            <div className="flex gap-2">
                <div className="flex-grow">
                    <input onChange=handleChangeMsg type="text" id="chat-input" placeholder="Message..." className="w-full p-2 rounded-lg" />
                </div>
                <button onClick=SubmitNewMsg id="send-btn" className="btn bg-blue-500 text-white px-4 py-2 rounded-lg whitespace-nowrap">Envoyer</button>
            </div>
            <div className="chat-container bg-gray-700 text-white p-4 rounded-lg flex-grow">
                { setMessages(messages) }
            </div>
        </div>
    </mini>
    `

    const context = {
        WaitingRoom: () => component,
    }

    return context
}

export default waitingRoom