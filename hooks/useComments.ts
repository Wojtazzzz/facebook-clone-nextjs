import { useAxios } from '@hooks/useAxios';

import type { CommentPayload } from '@ctypes/forms/CommentPayload';
import type { CommentType } from '@ctypes/features/CommentType';

export const useComments = () => {
    const { state, sendRequest } = useAxios<CommentType>();

    const createComment = (values: CommentPayload) => {
        if (state.status === 'LOADING') return;

        sendRequest({
            url: `/api/posts/${values.resource_id}/comments`,
            method: 'POST',
            data: values,
        });
    };

    const updateComment = (commentId: number, values: CommentPayload) => {
        if (state.status === 'LOADING') return;

        sendRequest({
            url: `/api/posts/${values.resource_id}/comments/${commentId}`,
            method: 'PUT',
            data: values,
        });
    };

    const removeComment = (resourceId: number, commentId: number) => {
        if (state.status === 'LOADING') return;

        sendRequest({
            url: `/api/posts/${resourceId}/comments/${commentId}`,
            method: 'DELETE',
        });
    };

    return { state, createComment, updateComment, removeComment };
};
