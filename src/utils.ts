export function throttle(callback: Function, wait: number) {
    let onThrottle;
    return function () {
        if (!onThrottle) {
            callback.apply(this, arguments)
            onThrottle = true;
            onThrottle = setTimeout(() => {
                onThrottle = false;
            }, wait)
        }
    }
}

export function debounce(callback: Function, wait: number) {
    let onDebounce;
    const context = this;
    return function () {
        const args = arguments;
        clearTimeout(onDebounce);
        onDebounce = setTimeout(() => {
            callback.apply(context, args);
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