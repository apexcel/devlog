import { useEffect } from "react";

const makeFloating = <T extends Element>(container: React.RefObject<T>, target: React.RefObject<T>) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const classList = target.current.classList;
            const className = 'floating';
            entry.intersectionRatio > 0.2 ? classList.remove(className) : classList.add(className);
        });
    });

    observer.observe(container.current);
    return () => observer.unobserve(container.current);
}

export default function useFloating<T extends Element>(container: React.RefObject<T>, target: React.RefObject<T>) {
    useEffect(() => {
        makeFloating(container, target)
    }, []);
}