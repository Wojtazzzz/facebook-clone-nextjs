import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPaginatedResponse, IPost } from '@utils/types';
import type { QueryKey } from '@tanstack/react-query';

export const useLike = (queryKey: QueryKey) => {
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
                            likes_count: post.likes_count + 1,
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

            return { previousPosts };
        },

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

type IQueryData = InfiniteData<IPaginatedResponse<IPost>>;

const mutationFn = (id: number) => axios.post(`/api/posts/${id}/likes`);
