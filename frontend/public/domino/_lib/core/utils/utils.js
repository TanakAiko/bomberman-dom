export function deepCopy(input) {
    if (Array.isArray(input)) {
        return input.map(deepCopy)
    } else if (isObject(input)) {
        return Object.fromEntries(
            Object.entries(input).map(([key, value]) => [key, deepCopy(value)])
        )
    } else {
        return input
    }
}

function isObject(input) {
    return (
        typeof input === "object" &&
        input !== null &&
        !(input instanceof RegExp)
    )
}