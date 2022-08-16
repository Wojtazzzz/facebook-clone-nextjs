import { useComments } from '@hooks/useComments';
import { ActionButton } from '../ActionButton';

interface DeleteActionProps {
    postId: number;
    commentId: number;
}

export const DeleteAction = ({ postId, commentId }: DeleteActionProps) => {
    const { useRemove } = useComments();
    const { remove, isLoading } = useRemove();

    const handleRemove = () => {
        remove(postId, commentId);
    };

    return <ActionButton title="Delete" isDisabled={isLoading} callback={handleRemove} />;
};
