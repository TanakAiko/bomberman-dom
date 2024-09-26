const player = () => {
    const component = `
        <div id="nickname-screen">
            <input onChange=handleChange type="text" id="nickname-input" placeholder="Entrez votre pseudo" className="w-full p-4 mb-4 rounded-lg text-lg bg-blue-100 text-blue-800 placeholder-blue-400" />
            <button onClick=SubmitUserInfos id="start-btn" className="btn bg-red-500 text-white px-8 py-4 rounded-lg text-xl w-full">Commencer</button>
        </div>
    `
    const context = {
        Player: () => component,
    }
    return context
}

export default player