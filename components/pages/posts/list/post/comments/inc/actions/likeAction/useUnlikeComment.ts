import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { IComment, IPaginatedResponse } from '@utils/types';

export const useUnlikeComment = (postId: number) => {
    const queryClient = useQueryClient();
    const queryKey = ['comments', postId];

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
                            likes_count: comment.likes_count - 1,
                            is_liked: false,
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

        onSettled: () => {
            queryClient.invalidateQueries(queryKey);
        },
    });

    const unlike = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        unlike,
        ...mutation,
    };
};

type IQueryData = InfiniteData<IPaginatedResponse<IComment>>;

const mutationFn = (id: number) => axios.delete(`/api/comments/${id}/likes`);
