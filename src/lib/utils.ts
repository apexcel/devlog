export function throttle(fn: Function, wait: number) {
    let onThrottle;
    const throttled = (args) => {
        if (!onThrottle) {
            fn.apply(this, args);
            onThrottle = true;
            setTimeout(() => {
                onThrottle = false;
            }, wait);
        }
    }
    return throttled;
}

export function debounce(fn: Function, wait: number) {
    let onDebounce;
    const context = this;
    return function () {
        const args = arguments;
        clearTimeout(onDebounce);
        onDebounce = setTimeout(() => {
            fn.apply(context, args);
        }, wait);
    }
}

export function getNearest(array: number[], target: number) {
    let max = Math.max(...array);
    let nearest = 0, index = 0;
    array.forEach((v, i) => {
        let abs = Math.abs(v - target);
        if (abs < max) {
            max = abs;
            nearest = v;
            index = i;
        }
    })
    return [nearest, index];
}

export function className(prefix: string) {
    return (feature) => `${prefix}-${feature}`;
}

/**
 * 
 * @param currentPos Current scrollbar position
 * @returns Ratio of current scrollbar position
 */

export function getScrollRatio(currentPos: number) {
    const bodyHeight = document.body.offsetHeight;
    const innerHeight = globalThis.innerHeight;
    return currentPos / (bodyHeight - innerHeight)
}

export function removeAllWhiteSpace(string: string) {
    return string.split(' ').join('');
}

export function isAlpha(string: string) {
    for (let ch of string) {
        const ascii = ch.charCodeAt(0);
        return ((ascii >= 65 && ascii <= 90) || (ascii >= 97 && ascii <= 122)) ? true : false;
    }
}

export function replaceToWhiteSpace(string: string) {
    let ret = '';
    for (let ch of string) {
        ret += isAlpha(ch) ? ch : ' ';
    }
    return ret;
}

export function toKebabCase(string: string) {
    string = string.toLocaleLowerCase();
    return string.split(' ').join('-');
}

export function toPascalCase(string: string, remove = false) {
    const list = [' ', '.', '-', '_'];
    let ret = '';
    let next = false;
    ret += string[0].toLocaleUpperCase();

    for (let i = 1; i < string.length; i += 1) {
        if (list.findIndex(item => item === string[i]) > -1) {
            next = true;
            if (remove) continue;
            else ret += string[i];
        }
        else {
            if (next) {
                next = false;
                ret += string[i].toLocaleUpperCase();
            }
            else {
                ret += string[i];
            }
        }
    }
    return ret;
}

export function getScrollTop() {
    if (!document.body) return 0;
    return document.documentElement
        ? document.documentElement.scrollTop || document.body.scrollTop
        : document.body.scrollTop;
}