import { useAxios } from '@hooks/useAxios';

import type { ICommentPayload } from '@utils/types';
import type { IComment } from '@utils/types';

export const useComments = () => {
    const { state, sendRequest } = useAxios<IComment>();

    const createComment = (values: ICommentPayload) => {
        if (state.status === 'LOADING') return;

        sendRequest({
            url: `/api/posts/${values.resource_id}/comments`,
            method: 'POST',
            data: values,
        });
    };

    const updateComment = (commentId: number, values: ICommentPayload) => {
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
