import { useState } from 'react';

export const useCopyToClipboard = () => {
    const [wasCopied, setWasCopied] = useState(false);

    const copy = (value: string) => {
        setWasCopied(true);

        navigator.clipboard.writeText(value);
    };

    return {
        wasCopied,
        copy,
    };
};
