import { useAlertModal } from '@hooks/useAlertModal';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { IComment, ICommentPayload, IPaginatedResponse } from '@utils/types';

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: (response, data) => {
            queryClient.setQueryData<IQueryData>(['comments', data.resourceId], (prevData) => {
                if (!prevData) return;

                const pages = prevData.pages.map((page) => ({
                    ...page,
                    data: [response.data, ...page.data],
                }));

                return {
                    ...prevData,
                    pages,
                };
            });

            queryClient.invalidateQueries(['comments', data.resourceId]);
        },

        onError: () => alert('Something went wrong, please try again later.'),
    });

    const create = (data: ICommentCreateMutationPayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(data, {
            onSuccess,
        });
    };

    return {
        create,
        ...mutation,
    };
};

type IQueryData = InfiniteData<IPaginatedResponse<IComment>>;

type ICommentCreateMutationPayload = {
    resourceId: number;
} & ICommentPayload;

const mutationFn = ({ content, resourceId }: ICommentCreateMutationPayload) =>
    axios.post(`/api/posts/${resourceId}/comments`, { content });
