import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useUnsavePost = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const unsave = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        unsave,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/saved/posts/${id}`);
