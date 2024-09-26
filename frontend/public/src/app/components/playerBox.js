const playerDetail = (payload) => {
    const context = {
        PlayerDetail: () => component,
        Life_String: () => "❤️".repeat(context.life),
        ...payload,
    }

    const component = `
        <div className="player-info bg-rouge-500 bg-opacity-50">
            <span className="player-avatar">${context.representation}</span>
            <div className="player-details">
                <div className="player-name">${context.name}</div>
                <div className="player-stats">
                    <span>Score:${context.score}</span>
                    <span>Life:${context.Life_String()}</span>
                </div>
             </div>
        </div>
    `

    return context
}

export default playerDetail