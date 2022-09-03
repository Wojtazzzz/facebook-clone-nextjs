import { useAlertModal } from '@hooks/useAlertModal';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ICommentPayload } from '@utils/types';

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);
    const { alert } = useAlertModal();

    const create = (data: ICommentCreateMutationPayload, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments', data.resourceId]);
                onSuccess();
            },

            onError: () => alert('Something went wrong, please try again later.'),
        });
    };

    return {
        create,
        ...mutation,
    };
};

type ICommentCreateMutationPayload = {
    resourceId: number;
} & ICommentPayload;

const mutationFn = ({ content, resourceId }: ICommentCreateMutationPayload) =>
    axios.post(`/api/posts/${resourceId}/comments`, { content });
