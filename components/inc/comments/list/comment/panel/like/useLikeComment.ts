import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { IComment, IPaginatedResponse } from '@utils/types';
import { useAlertModal } from '@hooks/useAlertModal';
import { getPostCommentsQK } from '@utils/queryKeys';

export const useLikeComment = (postId: number) => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();
    const queryKey = getPostCommentsQK(postId);

    const mutation = useMutation(mutationFn, {
        onMutate: async (id) => {
            const previousComments = queryClient.getQueryData(queryKey);
            await queryClient.cancelQueries(queryKey);

            queryClient.setQueryData<IQueryData>(queryKey, (data) => {
                if (!data) return;

                const pages = data.pages.map((page) => {
                    const data = page.data.map((comment) => {
                        if (comment.id !== id) {
                            return comment;
                        }

                        return {
                            ...comment,
                            likes_count: comment.likes_count + 1,
                            is_liked: true,
                        };
                    });

                    return {
                        ...page,
                        data,
                    };
                });

                return {
                    ...data,
                    pages,
                };
            });

            return { previousComments };
        },

        onError: () => alert('Something went wrong, please try again later.'),
        onSettled: () => queryClient.invalidateQueries(queryKey),
    });

    const like = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        like,
        ...mutation,
    };
};

type IQueryData = InfiniteData<IPaginatedResponse<IComment>>;

const mutationFn = (id: number) => axios.post(`/api/comments/${id}/likes`);
