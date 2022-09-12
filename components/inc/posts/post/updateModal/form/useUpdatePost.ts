import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPostUpdatePayload } from '@utils/types';

export const useUpdatePost = (queryKey: unknown[]) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const update = (postId: number, data: IPostUpdatePayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        const formData = new FormData();

        formData.append('content', data.content);
        data.imagesToDelete.forEach((img) => formData.append('imagesToDelete[]', img.toString()));
        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate(
            { postId, values: formData },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(queryKey);
                    onSuccess();
                },
            }
        );
    };

    return {
        update,
        ...mutation,
    };
};

type IMutationFnData = {
    postId: number;
    values: FormData;
};

const mutationFn = ({ postId, values }: IMutationFnData) => axios.post(`/api/posts/${postId}`, values);
