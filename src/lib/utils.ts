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