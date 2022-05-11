import { useAxios } from '@hooks/useAxios';

import type { LikeResponse } from '@ctypes/responses/LikeResponse';

export const useLikes = (postId: number) => {
    const { state, sendRequest } = useAxios<LikeResponse>();

    const handleLike = (isLiked: boolean) => {
        if (state.status === 'LOADING') return;

        isLiked
            ? sendRequest({ method: 'DELETE', url: `/api/likes/${postId}` })
            : sendRequest({ method: 'POST', url: '/api/likes', data: { postId } });
    };

    return { state, handleLike };
};
