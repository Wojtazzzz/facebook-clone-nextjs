import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useUnlike = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const unlike = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(['posts']),
        });
    };

    return {
        unlike,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/posts/${id}/likes`);
