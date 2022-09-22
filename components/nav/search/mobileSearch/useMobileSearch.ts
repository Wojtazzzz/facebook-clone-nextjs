import { useState } from 'react';

export const useMobileSearch = () => {
    const [isActive, setIsActive] = useState(false);

    const open = () => setIsActive(true);
    const close = () => setIsActive(false);

    return {
        isActive,
        open,
        close,
    };
};
