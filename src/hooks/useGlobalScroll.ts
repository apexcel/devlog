import { useCallback, useEffect, useRef } from 'react'

export const useGlobalScroll = () => {
    const dom = useRef();

    const handleGlobalScroll = useCallback(([entry]) => {
        const current = { dom };
        console.log(current)
        console.log(entry)
        if (entry.isIntersecting) {
            console.log('intersecting')
        }
    }, []);

    useEffect(() => {
        let observer: IntersectionObserver;
        const {current} = dom;

        if (current) {
            observer = new IntersectionObserver(handleGlobalScroll, {threshold: 0.7});
            observer.observe(current);
        }

        return () => observer && observer.disconnect();
    }, []);

    return {
        ref: dom
    }
};
