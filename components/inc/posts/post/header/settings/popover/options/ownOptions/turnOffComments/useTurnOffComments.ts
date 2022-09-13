import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useTurnOffComments = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const turnOffComments = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        turnOffComments,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.put(`/api/posts/${id}/turn-off-comments`);
