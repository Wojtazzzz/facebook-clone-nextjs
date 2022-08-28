import { axios } from '@libs/axios';
import type { ILike } from '@utils/types';
import { useQuery } from '@tanstack/react-query';

export const useGetLikes = (postId: number) => {
    return useQuery<ILike[]>(['likes'], () =>
        axios.get(`/api/posts/${postId}/likes`).then((response) => response.data)
    );
};
