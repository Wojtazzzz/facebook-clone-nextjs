import { axios } from '@utils/axios';
import type { ILike } from '@utils/types';
import { useQuery } from '@tanstack/react-query';
import { getCommentLikesQK } from '@utils/queryKeys';

export const useGetCommentLikes = (commentId: number, options?: {}) => {
    return useQuery<ILike[]>(getCommentLikesQK(commentId), () => queryFn(commentId), options);
};

const queryFn = (commentId: number) => axios.get(`/api/comments/${commentId}/likes`).then((response) => response.data);
