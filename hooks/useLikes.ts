import { useAxios } from '@hooks/useAxios';

import type { LikeResponse } from '@ctypes/responses/LikeResponse';

export const useLikes = (post_id: number) => {
    const { state, sendRequest } = useAxios<LikeResponse>();

    const handleLike = (isLiked: boolean) => {
        if (state.status === 'LOADING') return;

        isLiked
            ? sendRequest({ method: 'DELETE', url: `/api/likes/${post_id}` })
            : sendRequest({ method: 'POST', url: '/api/likes', data: { post_id } });
    };

    return { state, handleLike };
};
