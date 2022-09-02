import { ActionButton } from './ActionButton';
import { useRemove } from './useRemove';

interface DeleteActionProps {
    postId: number;
    commentId: number;
}

export const DeleteAction = ({ postId, commentId }: DeleteActionProps) => {
    const { remove, isLoading } = useRemove();

    const handleRemove = () => {
        remove({
            resourceId: postId,
            commentId,
        });
    };

    return <ActionButton title="Delete" isDisabled={isLoading} callback={handleRemove} />;
};
