import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { QueryKey } from '@tanstack/react-query';

export const useRemovePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const remove = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/posts/${id}`);
