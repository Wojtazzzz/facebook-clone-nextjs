import { useState } from 'react';
import { usePosts } from '@hooks/usePosts';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '@components/pages/posts/post/inc/PanelButton';
import { ApiError } from '@components/pages/posts/post/panel/ApiError';

interface LikeButtonProps {
    postId: number;
    isLiked: boolean;
}

export const LikeButton = ({ postId, isLiked }: LikeButtonProps) => {
    const [isLikedNow, setIsLikedNow] = useState(isLiked);
    const { state, like, unlike } = usePosts();

    const handleLike = () => {
        isLiked ? unlike(postId) : like(postId);

        setIsLikedNow((prevState) => !prevState);
    };

    if (state.status === 'ERROR') return <ApiError />;

    return <PanelButton title="Like" icon={faThumbsUp} isActive={isLikedNow} callback={handleLike} />;
};
