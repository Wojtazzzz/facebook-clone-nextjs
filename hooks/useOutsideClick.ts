import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLDivElement | HTMLFormElement>(callback: () => void) => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!ref.current) return;
            if (ref.current.contains(<Node>event.target)) return;

            callback();
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref, callback]);

    return ref;
};
