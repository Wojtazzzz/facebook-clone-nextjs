import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useSavePost = (queryKey: unknown[]) => {
    const mutation = useMutation(mutationFn);
    const queryClient = useQueryClient();

    const save = (id: number, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey);
                onSuccess();
            },
        });
    };

    return {
        save,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post('/api/saved/posts', { post_id: id });
