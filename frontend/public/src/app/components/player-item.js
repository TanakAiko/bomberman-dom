const playerItem = (payload) => {
    const context = {
        PlayerItem: () => component,
        ...payload
    }

    const component = 
    `
    <div className="text-white p-2 rounded-lg flex items-center" >
        <img src="${context.avatar}" alt="${context.nickname}" className="w-8 h-8 mr-2 rounded-full" />
        <span>${context.nickname}</span>
    </div>
    `
    return context
}

export default playerItem