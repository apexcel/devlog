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