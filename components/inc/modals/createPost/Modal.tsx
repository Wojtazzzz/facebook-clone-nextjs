import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { Modal as ModalTemplate } from '@components/inc/Modal';
import { ModalContent } from '@components/inc/modals/createPost/ModalContent';

import { closeModal } from '@redux/slices/CreatePostModalSlice';

export const Modal = () => {
    const isActive = useAppSelector((store) => store.createPostModal.isModalActive);
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(closeModal());

    return (
        <ModalTemplate label="Create post modal" isOpen={isActive} title="Create post" closeModal={handleClose}>
            <ModalContent />
        </ModalTemplate>
    );
};
