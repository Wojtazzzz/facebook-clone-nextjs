import { useState, useEffect } from 'react';
import { useAxios } from '@hooks/useAxios';

export const useLikes = (post_id: number) => {
    const { state, sendRequest } = useAxios();
    const [likes, setLikes] = useState(0);

    const handleLike = (isLiked: boolean) => {
        if (state.status === 'LOADING') return;

        setLikes((prevState) => prevState + 10);

        isLiked
            ? sendRequest({ method: 'DELETE', url: `/api/likes/${post_id}` })
            : sendRequest({ method: 'POST', url: '/api/likes', data: { post_id } });
    };

    return { likes, state, handleLike };
};
