const endGame = () => {
    const component = `
        <mini>
            <div id="end-game-screen">
            <h3 className="text-4xl text-center text-white-300 mb-8">{endMessage}</h3>
            <div className="flex justify-center">
                <button className="btn bg-yellow-500 text-white px-8 py-4 rounded-lg text-xl w-full" onClick=goToHome >Rejouer</button>
            </div>
        </div>
        </mini>
    `;

    const context = {
        EndGame: () => component,
    };

    return context;
}

export default endGame;