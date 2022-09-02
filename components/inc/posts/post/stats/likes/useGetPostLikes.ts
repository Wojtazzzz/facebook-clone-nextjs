import { axios } from '@libs/axios';
import type { ILike } from '@utils/types';
import { useQuery } from '@tanstack/react-query';

export const useGetPostLikes = (postId: number, options?: {}) => {
    const queryKey = ['likes', { post: postId }];

    return useQuery<ILike[]>(queryKey, () => queryFn(postId), options);
};

const queryFn = (postId: number) => axios.get(`/api/posts/${postId}/likes`).then((response) => response.data);
