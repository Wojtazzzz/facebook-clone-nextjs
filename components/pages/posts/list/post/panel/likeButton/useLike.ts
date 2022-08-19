import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useLike = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const like = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(['posts']),
        });
    };

    return {
        like,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post(`/api/posts/${id}/likes`);
