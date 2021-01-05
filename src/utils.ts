export function scrollNavigation(className: string) {
    let prevPos = 0;
    globalThis.addEventListener('scroll', debounce(() => {
        const currentPos = document.documentElement.scrollTop;
        const showScrollTopPos = 15;

        if (currentPos < 105) {
            document.body.getElementsByClassName(className)[0].classList.add('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            return;
        }
        if (Math.abs(prevPos - currentPos) <= showScrollTopPos) {
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-up');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            document.body.getElementsByClassName(className)[0].classList.add('top');
            return;
        }
        if (currentPos > prevPos) {
            document.body.getElementsByClassName(className)[0].classList.remove('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-up');
            document.body.getElementsByClassName(className)[0].classList.add('scroll-down');
        }
        else {
            document.body.getElementsByClassName(className)[0].classList.remove('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            document.body.getElementsByClassName(className)[0].classList.add('scroll-up');
        }
        prevPos = currentPos;
    }, 150))
    return;
}

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