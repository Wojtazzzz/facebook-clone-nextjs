import { useEffect, useState } from 'react';

export const useSearchActive = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!screen || screen.width < 640) return;

        setIsActive(true);
    }, []);

    const open = () => {
        if (!screen || screen.width > 640) return;

        setIsActive(true);
    };

    const close = () => {
        if (!screen || screen.width > 640) return;

        setIsActive(false);
    };

    return {
        isActive,
        open,
        close,
    };
};
