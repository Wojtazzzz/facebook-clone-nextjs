import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { IPostCreatePayload } from '@utils/types';
import type { QueryKey } from '@tanstack/react-query';

export const useCreatePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const create = (data: IPostCreatePayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(formData, {
            onSuccess,
        });
    };

    return {
        create,
        ...mutation,
    };
};

const mutationFn = (data: FormData) => axios.post('/api/posts', data);
