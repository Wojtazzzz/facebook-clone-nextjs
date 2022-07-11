import { useAppDispatch } from '@hooks/redux';

import { Modal as ModalTemplate } from '@components/inc/Modal';
import { ModalContent } from '@components/pages/posts/create/modal/ModalContent';

import { closeModal } from '@redux/slices/CreatePostModalSlice';

export const Modal = () => {
    const dispatch = useAppDispatch();
    const handleClose = () => dispatch(closeModal());

    return (
        <ModalTemplate label="Create post modal" title="Create post" closeModal={handleClose}>
            <ModalContent />
        </ModalTemplate>
    );
};
