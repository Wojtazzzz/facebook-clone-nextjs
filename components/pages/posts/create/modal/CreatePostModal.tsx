import { Form } from '@components/pages/posts/create/modal/Form';
import { Modal } from '@components/inc/Modal';

interface CreatePostModalProps {
    handleCloseModal: () => void;
}

export const CreatePostModal = ({ handleCloseModal }: CreatePostModalProps) => {
    return (
        <Modal title="Create Post" closeModal={handleCloseModal}>
            <Form closeModal={handleCloseModal} />
        </Modal>
    );
};
