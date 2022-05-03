import { useEffect, useState } from 'react';
import { useLikes } from '@hooks/useLikes';

import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '@components/pages/posts/post/inc/PanelButton';
import { ApiError } from '@components/pages/posts/post/panel/ApiError';

interface LikeButtonProps {
    postId: number;
    isLiked: boolean;
    setTotalLikes: (likesCount: number) => void;
}

export const LikeButton = ({ postId, isLiked, setTotalLikes }: LikeButtonProps) => {
    const [isLikedNow, setIsLikedNow] = useState(isLiked);
    const { state, handleLike } = useLikes(postId);

    useEffect(() => {
        if (state.status !== 'SUCCESS') return;

        setTotalLikes(state.data.data.likesCount);
        setIsLikedNow((prevState) => !prevState);
    }, [state, setTotalLikes]);

    if (state.status === 'ERROR') return <ApiError />;

    return <PanelButton title="Like" icon={faThumbsUp} isActive={isLikedNow} callback={() => handleLike(isLikedNow)} />;
};
