import { useEffect, useState } from 'react'

export const useActive = (headingIds, rootMargin = null) => {
    const [active, setActive] = useState(``);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                    console.log(active)
                }
            });
        },
            {
                rootMargin: rootMargin ? rootMargin : `0% 0% -95% 0%`,
            });

        headingIds.forEach(id => observer.observe(id));

        return () => headingIds.forEach(id => observer.unobserve(id));

    }, [headingIds])

    return active;
};
