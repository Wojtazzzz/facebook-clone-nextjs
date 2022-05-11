import { ActionButton } from '@components/pages/posts/post/comments/inc/ActionButton';

interface DeleteActionProps {
    showDeleteModal: () => void;
}

export const DeleteAction = ({ showDeleteModal }: DeleteActionProps) => {
    return <ActionButton title="Delete" callback={showDeleteModal} />;
};
