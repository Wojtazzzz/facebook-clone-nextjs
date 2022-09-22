import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { QueryKey } from '@tanstack/react-query';

export const useTurnOnComments = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const turnOnComments = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        turnOnComments,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.put(`/api/posts/${id}/turn-on-comments`);
