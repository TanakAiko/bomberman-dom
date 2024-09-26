const powerUpBox = () => {
    const component = `
        <div className="bg-gray-700 text-white p-4 rounded-lg">
            <h3 className="text-xl mb-2">Power-ups</h3>
            <div className="flex justify-around">
                <div className="power-up power-up-bombs" title="Bombs">B</div>
                <div className="power-up power-up-flames" title="Flames">F</div>
                <div className="power-up power-up-speed" title="Speed">S</div>
            </div>
        </div>
    `

    const context = {
        PowerUpBox: () => component,
    }
    return context;
}

export default powerUpBox
