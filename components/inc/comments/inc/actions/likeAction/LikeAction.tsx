import { ActionButton } from '../ActionButton';
import { useLikeComment } from './useLikeComment';
import { useUnlikeComment } from './useUnlikeComment';

interface LikeActionProps {
    isLiked: boolean;
    commentId: number;
    postId: number;
}

export const LikeAction = ({ isLiked, commentId, postId }: LikeActionProps) => {
    const { like } = useLikeComment(postId);
    const { unlike } = useUnlikeComment(postId);

    const handleLike = () => like(commentId);
    const handleUnlike = () => unlike(commentId);

    return (
        <ActionButton
            title="Like"
            styles={isLiked ? 'text-primary hover:text-primary' : ''}
            callback={isLiked ? handleUnlike : handleLike}
        />
    );
};
