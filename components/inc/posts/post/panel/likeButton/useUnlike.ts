import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { IPaginatedResponse, IPost } from '@utils/types';
import type { QueryKey } from '@tanstack/react-query';

export const useUnlike = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onMutate: async (id) => {
            const previousPosts = queryClient.getQueryData(queryKey);
            await queryClient.cancelQueries(queryKey);

            queryClient.setQueryData<IQueryData>(queryKey, (data) => {
                if (!data) return;

                const pages = data.pages.map((page) => {
                    const data = page.data.map((post) => {
                        if (post.id !== id) {
                            return post;
                        }

                        return {
                            ...post,
                            likes_count: post.likes_count - 1,
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

            return { previousPosts };
        },

        onSettled: () => queryClient.invalidateQueries(queryKey),
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

type IQueryData = InfiniteData<IPaginatedResponse<IPost>>;

const mutationFn = (id: number) => axios.delete(`/api/posts/${id}/likes`);
