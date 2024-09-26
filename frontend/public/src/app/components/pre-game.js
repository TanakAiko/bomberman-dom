const preGame = () => {
    const component = `
        <div id="countdown-screen">
            <h2 className="text-4xl text-white text-center mb-4">La partie commence dans</h2>
            <div id="countdown-timer" className="text-6xl text-yellow-300 text-center">{timer}</div>
        </div>
    `
    const context = {
        PreGame: () => component,
    }
    return context
} 

export default preGame