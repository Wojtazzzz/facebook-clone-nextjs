import { useInfiniteData } from '@hooks/useInfiniteData';
import { getPostCommentsQK } from '@utils/queryKeys';
import type { IComment } from '@utils/types';

export const useGetComments = (postId: number) => {
    return useInfiniteData<IComment>({
        queryKey: getPostCommentsQK(postId),
        endpoint: `/api/posts/${postId}/comments`,
    });
};
