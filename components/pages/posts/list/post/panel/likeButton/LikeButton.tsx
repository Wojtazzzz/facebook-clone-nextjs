import { SadSmileError } from '@components/inc/SadSmileError';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '../inc/PanelButton';
import { useLike } from './useLike';
import { useUnlike } from './useUnlike';

interface LikeButtonProps {
    postId: number;
    isLiked: boolean;
}

export const LikeButton = ({ postId, isLiked }: LikeButtonProps) => {
    const { like, isError: isLikeError } = useLike();
    const { unlike, isError: isUnlikeError } = useUnlike();

    const handleLike = () => {
        isLiked ? unlike(postId) : like(postId);
    };

    if (isLikeError || isUnlikeError) return <SadSmileError testId="like-apiError" size="2xl" />;

    return <PanelButton title="Like" icon={faThumbsUp} isActive={isLiked} callback={handleLike} />;
};
