import { useEffect, useState } from "react";

const useWindowSize = () => {
    const [size, setSize] = useState({
        width: window.document.documentElement.clientWidth,
        height: window.document.documentElement.clientHeight
    });
    let isRunning = false;

    const set = () => {
        setSize({ width: window.document.documentElement.clientWidth, height: window.document.documentElement.clientHeight });
        isRunning = false;
    };

    const resize = () => {
        if (!isRunning) {
            isRunning = true;
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(set);
            }
            else {
                setTimeout(set, 66);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [])

    return size;
};

export default useWindowSize;
