import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useHidePost = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const hide = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        hide,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post('/api/hidden/posts', { post_id: id });
