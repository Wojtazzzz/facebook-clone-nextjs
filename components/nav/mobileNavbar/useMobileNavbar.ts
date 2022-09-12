import { useState } from 'react';

export const useMobileNavbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleActive = () => setIsActive((prevState) => !prevState);

    return {
        isActive,
        toggleActive,
    };
};
