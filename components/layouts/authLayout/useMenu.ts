import { useState } from 'react';

export const useMenu = () => {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => setIsActive((prevState) => !prevState);
    const close = () => setIsActive(false);

    return {
        isActive,
        toggle,
        close,
    };
};
