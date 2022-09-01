import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useHide = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const hide = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(['posts']),
        });
    };

    return {
        hide,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post('/api/hidden/posts', { post_id: id });
