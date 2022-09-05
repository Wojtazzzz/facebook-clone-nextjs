import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPostPayload } from '@utils/types';
import { useAuth } from '@hooks/useAuth';

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);
    const { user } = useAuth();

    const update = (postId: number, data: IPostPayload, onSuccess: () => void) => {
        if (mutation.isLoading || !user) return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(postId, formData, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts', 'all']);
                queryClient.invalidateQueries(['posts', 'own', user.id]);
                onSuccess();
            },
        });
    };

    return {
        update,
        ...mutation,
    };
};

const mutationFn = (postId: number, data: FormData) => axios.put(`/api/posts/${postId}`, data);
