import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPostPayload } from '@utils/types';
import { useAuth } from '@hooks/useAuth';

export const useCreate = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);
    const { user } = useAuth();

    const create = (data: IPostPayload, onSuccess: () => void) => {
        if (mutation.isLoading || !user) return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts', 'all']);
                queryClient.invalidateQueries(['posts', 'OWN', user.id]);
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
