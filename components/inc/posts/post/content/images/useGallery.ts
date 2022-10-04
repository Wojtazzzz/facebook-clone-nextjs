import { useState } from 'react';

export const useGallery = () => {
    const [isActive, setIsActive] = useState(false);

    const open = () => {
        toggleBodyOverflow();

        setIsActive(true);
    };

    const close = () => {
        toggleBodyOverflow();

        setIsActive(false);
    };

    return {
        isActive,
        open,
        close,
    };
};

const toggleBodyOverflow = () => {
    document.body.classList.toggle('overflow-y-hidden');
};
