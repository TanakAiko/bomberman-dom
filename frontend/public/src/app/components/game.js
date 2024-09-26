const game = () => {
    const context = {
        Game: () => component,
    }

    const component = `
        <div id="game-screen" className="">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-3/4 flex flex-col">
                    <div id="game-area" className="bg-gray-800 w-full aspect-[15/13] mb-4 rounded-lg relative">
                        <div className="game-grid absolute inset-0">
                            {divs.join("")}
                        </div>
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-2 rounded">
                            Temps: <span id="game-timer"> {gameTimer} </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <input onChange=handleChangeMsg type="text" id="chat-input" placeholder="Message..." className="w-full p-2 rounded-lg" />
                        </div>
                        <button onClick=SubmitNewMsg id="send-btn" className="btn bg-blue-500 text-white px-4 py-2 rounded-lg whitespace-nowrap">Envoyer</button>
                    </div>

                </div>
                <div className="w-full lg:w-1/4 flex flex-col gap-4">
                    
                    <div id="player-info" className="bg-gray-700 text-white p-4 rounded-lg overflow-y-auto max-h-[300px]">
                        <h3 className="text-xl mb-2">Joueurs</h3>
                        { setPlayers(players) }
                    </div>

                    <div className="chat-container bg-gray-700 text-white p-4 rounded-lg flex-grow">
                        { setMessages(messages) }
                    </div>

                    <div className="bg-gray-700 text-white p-4 rounded-lg">
                        <h3 className="text-xl mb-2">Power-ups</h3>
                        <div className="flex justify-around">
                            <div className="power-up power-up-bombs" title="Bombs">B</div>
                            <div className="power-up power-up-flames" title="Flames">F</div>
                            <div className="power-up power-up-speed" title="Speed">S</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `

    return context
}

export default game