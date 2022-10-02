import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '../inc/PanelButton';
import { useLike } from './useLike';
import { useUnlike } from './useUnlike';
import type { QueryKey } from '@tanstack/react-query';

interface LikeButtonProps {
    postId: number;
    isLiked: boolean;
    queryKey: QueryKey;
}

export const LikeButton = ({ postId, isLiked, queryKey }: LikeButtonProps) => {
    const { like } = useLike(queryKey);
    const { unlike } = useUnlike(queryKey);

    const handleLike = () => {
        isLiked ? unlike(postId) : like(postId);
    };

    return <PanelButton title="Like" icon={faThumbsUp} isActive={isLiked} callback={handleLike} />;
};
