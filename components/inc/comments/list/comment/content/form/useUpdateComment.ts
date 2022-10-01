import { useAlertModal } from '@hooks/useAlertModal';
import { axios } from '@utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { IComment, ICommentPayload, IPaginatedResponse } from '@utils/types';
import type { AxiosResponse } from 'axios';
import { getPostCommentsQK } from '@utils/queryKeys';

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: (response, data) => {
            queryClient.setQueryData<IQueryData>(getPostCommentsQK(data.resourceId), (prevData) => {
                if (!prevData) return;

                const pages = prevData.pages.map((page) => {
                    const data = page.data.map((comment) => {
                        if (comment.id === response.data.id) {
                            return response.data;
                        }

                        return comment;
                    });

                    return {
                        ...page,
                        data,
                    };
                });

                return {
                    ...prevData,
                    pages,
                };
            });

            queryClient.invalidateQueries(getPostCommentsQK(data.resourceId));
        },

        onError: () => alert('Something went wrong, please try again later.'),
    });

    const update = (data: ICommentUpdateMutationPayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(data, {
            onSuccess,
        });
    };

    return {
        update,
        ...mutation,
    };
};

type IQueryData = InfiniteData<IPaginatedResponse<IComment>>;

type ICommentUpdateMutationPayload = {
    resourceId: number;
    commentId: number;
} & ICommentPayload;

const mutationFn = ({
    content,
    resourceId,
    commentId,
}: ICommentUpdateMutationPayload): Promise<AxiosResponse<IComment>> =>
    axios.put(`/api/posts/${resourceId}/comments/${commentId}`, { content });
