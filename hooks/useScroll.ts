import { useEffect, useRef, useState } from 'react';
import type InfiniteScroll from 'react-infinite-scroll-component';

export const useScroll = () => {
    const [scrollDistance, setScrollDistance] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;

        if (!element) return;

        element.addEventListener('scroll', () => setScrollDistance(element.scrollTop));

        return () => element.removeEventListener('scroll', () => setScrollDistance(element.scrollTop));
    }, [ref]);

    const scroll = () => {
        if (!ref.current) return;

        const element = ref.current;

        if (!element) return;

        element.scroll(0, 0);
    };

    return {
        ref,
        scrollDistance,
        scroll,
    };
};
