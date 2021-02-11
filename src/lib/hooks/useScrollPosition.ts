import { useLayoutEffect } from 'react'
import { throttle } from '../utils.ts'

const useScrollPosition = (effect, deps) => {
    let scrollY = globalThis.pageYOffset;

    const callback = () => {
        const y = globalThis.pageYOffset;
        effect({prev: scrollY, current: y})
        scrollY = y;
    };

    useLayoutEffect(() => {
        const scrollHandler = throttle(callback, 150);
        globalThis.addEventListener('scroll', scrollHandler)
        return () => globalThis.removeEventListener('scroll', scrollHandler)
    }, deps)
};

export default useScrollPosition;