import { useState } from 'react';

export const useCommentsActive = () => {
    const [areCommentsActive, setAreCommentsActive] = useState(false);

    const toggleCommentsActive = () => setAreCommentsActive((prevState) => !prevState);

    return {
        areCommentsActive,
        toggleCommentsActive,
    };
};
