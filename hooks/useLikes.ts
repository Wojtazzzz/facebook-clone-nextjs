import { useAxios } from '@hooks/useAxios';

import type { ILikeResponse } from '@utils/types';

export const useLikes = (postId: number) => {
    const { state, sendRequest } = useAxios<ILikeResponse>();

    const handleLike = (isLiked: boolean) => {
        if (state.status === 'LOADING') return;

        isLiked
            ? sendRequest({ method: 'DELETE', url: `/api/likes/${postId}` })
            : sendRequest({ method: 'POST', url: '/api/likes', data: { post_id: postId } });
    };

    return { state, handleLike };
};
