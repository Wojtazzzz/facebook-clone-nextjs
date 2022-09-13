import { useState } from 'react';

export const useSwitchForm = () => {
    const [isLoginFormActive, setIsLoginFormActive] = useState(true);

    const toggleForm = () => setIsLoginFormActive((prevState) => !prevState);

    return {
        isLoginFormActive,
        toggleForm,
    };
};
