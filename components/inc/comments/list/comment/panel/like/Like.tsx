import { ActionButton } from '../ActionButton';
import { useLikeComment } from './useLikeComment';
import { useUnlikeComment } from './useUnlikeComment';

interface LikeProps {
    isLiked: boolean;
    commentId: number;
    postId: number;
}

export const Like = ({ isLiked, commentId, postId }: LikeProps) => {
    const { like } = useLikeComment(postId);
    const { unlike } = useUnlikeComment(postId);

    const handleLike = () => like(commentId);
    const handleUnlike = () => unlike(commentId);

    return (
        <ActionButton
            title="Like"
            styles={isLiked ? 'text-primary-light hover:text-primary' : ''}
            callback={isLiked ? handleUnlike : handleLike}
        />
    );
};
