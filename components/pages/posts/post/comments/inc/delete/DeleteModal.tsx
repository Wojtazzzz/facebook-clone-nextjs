import ReactModal from 'react-modal';
import { Modal } from '@components/inc/Modal';
import { Content } from '@components/pages/posts/post/comments/inc/delete/Content';

ReactModal.setAppElement('body');

interface DeleteModalProps {
    isOpen: boolean;
    postId: number;
    commentId: number;
    closeModal: () => void;
}

export const DeleteModal = ({ isOpen, postId, commentId, closeModal }: DeleteModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            label="Confirm delete comment"
            title="Are you sure you want to delete that comment?"
            closeModal={closeModal}
        >
            <Content postId={postId} commentId={commentId} closeModal={closeModal} />
        </Modal>
    );
};
