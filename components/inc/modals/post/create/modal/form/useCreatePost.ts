import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPostCreatePayload } from '@utils/types';

export const useCreatePost = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const create = (data: IPostCreatePayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries(queryKey);
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
