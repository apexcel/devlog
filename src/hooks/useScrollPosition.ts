import { useLayoutEffect } from 'react'
import { throttle } from '../utils'

const useScrollPosition = (effect: ({ prev, current }: Record<string, number>) => void, deps: any[]) => {
    let scrollY = globalThis.scrollY;

    const callback = () => {
        const y = globalThis.scrollY;
        effect({ prev: scrollY, current: y })
        scrollY = y;
    };

    useLayoutEffect(() => {
        const scrollHandler = throttle(callback, 150);
        globalThis.addEventListener('scroll', scrollHandler);
        return () => globalThis.removeEventListener('scroll', scrollHandler);
    }, deps)
};

export default useScrollPosition;