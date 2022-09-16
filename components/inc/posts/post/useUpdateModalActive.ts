import { useState } from 'react';

export const useUpdateModalActive = () => {
    const [isModalActive, setIsModalActive] = useState(false);

    const openUpdateModal = () => setIsModalActive(true);
    const closeUpdateModal = () => setIsModalActive(false);

    return {
        isModalActive,
        openUpdateModal,
        closeUpdateModal,
    };
};
