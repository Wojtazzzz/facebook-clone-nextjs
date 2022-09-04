import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useUnhidePost = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const unhide = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(queryKey),
        });
    };

    return {
        unhide,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/hidden/posts/${id}`);