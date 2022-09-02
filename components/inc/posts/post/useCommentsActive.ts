import { useState } from 'react';

export const useCommentsActive = () => {
    const [commentsActive, setCommentsActive] = useState(false);

    const toggleCommentsActive = () => setCommentsActive((prevState) => !prevState);

    return {
        commentsActive,
        toggleCommentsActive,
    };
};
