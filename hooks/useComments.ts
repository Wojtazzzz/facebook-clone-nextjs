import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ICommentPayload } from '@utils/types';

export const useComments = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation(({ content, resource_id }: ICommentPayload) =>
        axios.post(`/api/posts/${resource_id}/comments`, { content })
    );

    const updateMutation = useMutation(({ commentId, data }: { commentId: number; data: ICommentPayload }) =>
        axios.put(`/api/posts/${data.resource_id}/comments/${commentId}`, { content: data.content })
    );

    const removeMutation = useMutation(({ resourceId, commentId }: { resourceId: number; commentId: number }) =>
        axios.delete(`/api/posts/${resourceId}/comments/${commentId}`)
    );

    const create = (data: ICommentPayload, onSuccess: () => void) => {
        if (createMutation.isLoading) return;

        createMutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments']);
                onSuccess();
            },
        });
    };

    const update = (commentId: number, data: ICommentPayload, onSuccess: () => void) => {
        if (updateMutation.isLoading) return;

        updateMutation.mutate(
            { commentId, data },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['comments']);
                    onSuccess();
                },
            }
        );
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
