import { axios } from '@libs/axios';
import type { ILike } from '@utils/types';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentLikes = (commentId: number) => {
    const queryKey = ['likes', { comment: commentId }];

    return useQuery<ILike[]>(queryKey, () => queryFn(commentId));
};

const queryFn = (commentId: number) => axios.get(`/api/comments/${commentId}/likes`).then((response) => response.data);
