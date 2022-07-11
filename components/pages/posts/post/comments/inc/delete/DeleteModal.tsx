import ReactModal from 'react-modal';
import { Modal } from '@components/inc/Modal';
import { Content } from '@components/pages/posts/post/comments/inc/delete/Content';

ReactModal.setAppElement('body');

interface DeleteModalProps {
    postId: number;
    commentId: number;
    closeModal: () => void;
}

export const DeleteModal = ({ postId, commentId, closeModal }: DeleteModalProps) => {
    return (
        <Modal
            label="Confirm delete comment"
            title="Are you sure you want to delete that comment?"
            closeModal={closeModal}
        >
            <Content postId={postId} commentId={commentId} closeModal={closeModal} />
        </Modal>
    );
};
