const evaluateExpression = (expression, context) => {
    return new Function('context', `
        with (context) {
            return ${expression};
        }
    `)(context);
}

export function EvalJS(code, context) {
    code = evalComponent(code, context)

    const nestedBracesRegex = /\{([^{}]*(\{[^{}]*\})?[^{}]*)+\}/g;

    let matchedJS = [];
    let matches;

    while ((matches = nestedBracesRegex.exec(code)) !== null) {
        matchedJS.push(matches[1]);
    }

    if (matchedJS.length > 0) {
        matchedJS.forEach(js => {
            const expr = evaluateExpression(js, context);
            code = code.replace(`{${js}}`, expr);
        });
    }

    return code;
}

function evalComponent(code, context) {
    const componentPattern = /<([A-Z][a-zA-Z0-9]*)\s*\/>/g;
    let matches
    let components = []
    while ((matches = componentPattern.exec(code)) !== null) {
        components.push(matches[1])
    }
    /* console.log(components)
    console.log(context )
    console.log(code) */

    if (components.length > 0) {
        components.forEach(component => {
            const codeComponent = EvalJS(context[component](), context);
            code = code.replace(`<${component} />`, codeComponent); 
        });
    }
    return code;
}