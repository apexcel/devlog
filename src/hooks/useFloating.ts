import { useEffect } from "react";

export default function useFloating(container: React.RefObject<Element>, target: React.RefObject<Element>) {
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const classList = target.current.classList;
                const className = 'floating';
                entry.intersectionRatio > 0.2 ? classList.remove(className) : classList.add(className);
            });
        });
    
        observer.observe(container.current);
        return () => {
            observer.disconnect();
        }
    }, []);
}