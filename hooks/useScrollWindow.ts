import { useEffect, useState } from 'react';

export const useScrollWindow = () => {
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.addEventListener('scroll', () => setScrollDistance(window.scrollY));

        return () => window.removeEventListener('scroll', () => setScrollDistance(window.scrollY));
    }, []);

    const scroll = () => {
        if (typeof window === 'undefined') return;

        window.scroll(0, 0);
    };

    return {
        scrollDistance,
        scroll,
    };
};
