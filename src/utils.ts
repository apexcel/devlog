export function throttle(callback: Function, wait: number) {
    let onThrottle;
    return function () {
        if (!onThrottle) {
            callback(arguments)
            onThrottle = true;
            onThrottle = setTimeout(() => {
                onThrottle = false;
            }, wait)
        }
    }
}

export function debounce(callback: Function, wait: number) {
    let onDebounce;
    return function () {
        clearTimeout(onDebounce);
        onDebounce = setTimeout(() => {
            callback.apply(this);
        }, wait);
    }
}

export function addClass(element: HTMLElement, className: string) {
    if (element) {
        element.classList.add(className);
    }
    return element;
}

export function removeClass(element: HTMLElement, className: string) {
    if (element) {
        element.classList.remove(className);
    }
    return element;
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