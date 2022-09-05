import { useState } from 'react';

export const useUploadActive = () => {
    const [isUploadActive, setIsUploadActive] = useState(false);

    const closeUpload = () => setIsUploadActive(false);
    const toggleUpload = () => setIsUploadActive((prevState) => !prevState);

    return {
        isUploadActive,
        closeUpload,
        toggleUpload,
    };
};
