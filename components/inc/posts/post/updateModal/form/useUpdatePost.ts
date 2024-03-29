import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { IPostUpdatePayload } from '@utils/types';
import type { QueryKey } from '@tanstack/react-query';

export const useUpdatePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
    });

    const update = (postId: number, data: IPostUpdatePayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        const formData = new FormData();

        formData.append('content', data.content);
        data.imagesToDelete.forEach((img) => formData.append('imagesToDelete[]', img.toString()));
        data.images.forEach((img) => formData.append('images[]', img));

        mutation.mutate({ postId, values: formData }, { onSuccess });
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
