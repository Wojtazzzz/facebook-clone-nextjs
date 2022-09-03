import { ActionButton } from '../ActionButton';
import { useRemove } from './useRemoveComment';

interface DeleteProps {
    postId: number;
    commentId: number;
}

export const Delete = ({ postId, commentId }: DeleteProps) => {
    const { remove, isLoading } = useRemove();

    const handleRemove = () => {
        remove({
            resourceId: postId,
            commentId,
        });
    };

    return <ActionButton title="Delete" isDisabled={isLoading} callback={handleRemove} />;
};
