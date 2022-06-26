import { useAppDispatch } from '@hooks/redux';

import { Modal as ModalTemplate } from '@components/inc/Modal';
import { ModalContent } from '@components/pages/posts/create/modal/ModalContent';

import { closeModal } from '@redux/slices/CreatePostModalSlice';

export const Modal = () => {
    const dispatch = useAppDispatch();

    const handleCloseModal = () => dispatch(closeModal());

    return (
        <ModalTemplate title="Create Post" closeModal={handleCloseModal}>
            <ModalContent />
        </ModalTemplate>
    );
};
