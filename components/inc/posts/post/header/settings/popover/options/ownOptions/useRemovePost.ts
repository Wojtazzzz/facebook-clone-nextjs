import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { useAuth } from '@hooks/useAuth';

export const useRemovePost = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const remove = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey);
            },
        });
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/posts/${id}`);
