import { axios } from '@libs/axios';
import type { ILike } from '@utils/types';
import { useQuery } from '@tanstack/react-query';
import { getPostLikesQK } from '@utils/queryKeys';

export const useGetPostLikes = (postId: number, options?: {}) => {
    return useQuery<ILike[]>(getPostLikesQK(postId), () => queryFn(postId), options);
};

const queryFn = (postId: number) => axios.get(`/api/posts/${postId}/likes`).then((response) => response.data);
