import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ICommentCreateMutationPayload, ICommentUpdateMutationPayload } from '@utils/types';

export const useComments = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation(({ content, resourceId }: ICommentCreateMutationPayload) =>
        axios.post(`/api/posts/${resourceId}/comments`, { content })
    );

    const updateMutation = useMutation(({ content, resourceId, commentId }: ICommentUpdateMutationPayload) =>
        axios.put(`/api/posts/${resourceId}/comments/${commentId}`, { content })
    );

    const removeMutation = useMutation(({ resourceId, commentId }: { resourceId: number; commentId: number }) =>
        axios.delete(`/api/posts/${resourceId}/comments/${commentId}`)
    );

    const create = (data: ICommentCreateMutationPayload, onSuccess: () => void) => {
        if (createMutation.isLoading) return;

        createMutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
                onSuccess();
            },
        });
    };

    const update = (data: ICommentUpdateMutationPayload, onSuccess: () => void) => {
        if (updateMutation.isLoading) return;

        updateMutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
                onSuccess();
            },
        });
    };

    const remove = (resourceId: number, commentId: number, onSuccess: () => void) => {
        if (removeMutation.isLoading) return;

        removeMutation.mutate(
            { resourceId, commentId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['comments']);
                    onSuccess();
                },
            }
        );
    };

    return {
        useCreate: () => ({
            create,
            ...createMutation,
        }),

        useRemove: () => ({
            remove,
            ...removeMutation,
        }),

        useUpdate: () => ({
            update,
            ...updateMutation,
        }),
    };
};
