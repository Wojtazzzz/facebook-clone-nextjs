import { useState } from 'react';

export const useEditMode = () => {
    const [isEditModeActive, setIsEditModeACtive] = useState(false);

    const toggleEditMode = () => setIsEditModeACtive((prevState) => !prevState);
    const closeEditMode = () => setIsEditModeACtive(false);

    return {
        isEditModeActive,
        toggleEditMode,
        closeEditMode,
    };
};
