import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPostPayload } from '@utils/types';

export const useCreate = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const create = (data: IPostPayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['OWN']);
                onSuccess();
            },
        });
    };

    return {
        create,
        ...mutation,
    };
};

const mutationFn = (data: FormData) => axios.post('/api/posts', data);