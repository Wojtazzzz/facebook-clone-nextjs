import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!ref.current) return;
            if (ref.current.contains(<Node>event.target)) return;

            event.stopPropagation();

            callback();
        };

        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref, callback]);

    return ref;
};
