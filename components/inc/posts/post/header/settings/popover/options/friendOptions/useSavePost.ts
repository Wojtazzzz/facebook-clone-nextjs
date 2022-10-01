import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { QueryKey } from '@tanstack/react-query';

export const useSavePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const save = (id: number, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess,
        });
    };

    return {
        save,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post('/api/saved/posts', { post_id: id });
