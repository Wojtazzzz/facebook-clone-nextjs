import { useState } from 'react';

export const useMobileNavbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => setIsActive((prevState) => !prevState);

    const close = () => {
        if (!screen || screen.width > 1024) return;

        setIsActive(false);
    };

    return {
        isActive,
        close,
        toggleActive,
    };
};
