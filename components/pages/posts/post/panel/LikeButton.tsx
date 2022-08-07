import { usePosts } from '@hooks/usePosts';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '@components/pages/posts/post/inc/PanelButton';
import { ApiError } from '@components/pages/posts/post/panel/ApiError';

interface LikeButtonProps {
    postId: number;
    isLiked: boolean;
}

export const LikeButton = ({ postId, isLiked }: LikeButtonProps) => {
    const { useLike, useUnlike } = usePosts();

    const { like, isError: isLikeError } = useLike();
    const { unlike, isError: isUnlikeError } = useUnlike();

    const handleLike = () => {
        isLiked ? unlike(postId) : like(postId);
    };

    if (isLikeError || isUnlikeError) return <ApiError />;

    return <PanelButton title="Like" icon={faThumbsUp} isActive={isLiked} callback={handleLike} />;
};
