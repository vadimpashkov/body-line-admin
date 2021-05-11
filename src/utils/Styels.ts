export function s(...classes: string[]) {
    return classes.join(' ')
}

type SifObject = {
    [p:string]: boolean
}
export function sif(classes: SifObject) {
    return Object.entries(classes).filter(([k, v]) => v).map(([k, v]) => k).join(' ');
}

export function S(...classesNames: string[]) {
    const classes = classesNames
    const sfunction = function () {
        return classes.join(' ')
    }

    sfunction.add = (className: string) => {
        if (!classes.includes(className)) {
            classes.push(className)
        }
        return sfunction
    }

    sfunction.remove = (className: string) => {
        const position = classes.indexOf(className)
        if (position !== -1) classes.splice(position, 1)
        return sfunction
    }

    sfunction.toggle = (className: string) => {
        const position = classes.indexOf(className)
        if (position !== -1) classes.splice(position, 1)
        else classes[classes.length] = className
        return sfunction
    }

    return sfunction
}