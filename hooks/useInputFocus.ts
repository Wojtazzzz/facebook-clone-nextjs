import { useRef } from 'react';

export const useInputFocus = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const focus = () => {
        inputRef.current?.focus();
    };

    return {
        inputRef,
        focus,
    };
};
