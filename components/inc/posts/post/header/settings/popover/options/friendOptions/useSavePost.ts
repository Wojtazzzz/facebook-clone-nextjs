import { useMutation } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useSavePost = () => {
    const mutation = useMutation(mutationFn);

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
