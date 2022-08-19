import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useSave = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const save = (id: number, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
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
