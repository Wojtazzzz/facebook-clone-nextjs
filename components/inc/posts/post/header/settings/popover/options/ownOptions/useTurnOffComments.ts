import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { useAuth } from '@hooks/useAuth';

export const useTurnOffComments = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const turnOffComments = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey);
            },
        });
    };

    return {
        turnOffComments,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.put(`/api/posts/${id}/turn-off-comments`);
