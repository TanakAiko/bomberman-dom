const message = (payload) => {
    const context = {
        Message: () => component,
        ...payload,
    }

    const component = `
        <div className="flex items-start mb-2">
            <div>
                <span className="font-bold">${context.nickname}:</span>
                <span>${context.content}</span>
            </div>
        </div>
    `

    return context;
}

export default message;