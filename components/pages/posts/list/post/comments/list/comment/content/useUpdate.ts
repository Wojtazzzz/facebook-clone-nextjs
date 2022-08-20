import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ICommentPayload } from '@utils/types';

export const useUpdate = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const update = (data: ICommentUpdateMutationPayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
                onSuccess();
            },
        });
    };

    return {
        update,
        ...mutation,
    };
};

type ICommentUpdateMutationPayload = {
    resourceId: number;
    commentId: number;
} & ICommentPayload;

const mutationFn = ({ content, resourceId, commentId }: ICommentUpdateMutationPayload) =>
    axios.put(`/api/posts/${resourceId}/comments/${commentId}`, { content });
