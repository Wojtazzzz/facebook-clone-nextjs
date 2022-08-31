import { useState } from 'react';

export const useTooltip = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = (isOpen: boolean) => setIsOpen(isOpen);

    return {
        isOpen,
        toggle,
    };
};
