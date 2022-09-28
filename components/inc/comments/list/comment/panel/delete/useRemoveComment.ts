import { useAlertModal } from '@hooks/useAlertModal';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostCommentsQK } from '@utils/queryKeys';

export const useRemove = () => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: (response, data) => queryClient.invalidateQueries(getPostCommentsQK(data.resourceId)),
        onError: () => alert('Something went wrong, please try again later.'),
    });

    const remove = (data: IRemovePayload) => {
        if (mutation.isLoading) return;

        mutation.mutate(data);
    };

    return {
        remove,
        ...mutation,
    };
};

type IRemovePayload = {
    resourceId: number;
    commentId: number;
};

const mutationFn = ({ resourceId, commentId }: IRemovePayload) =>
    axios.delete(`/api/posts/${resourceId}/comments/${commentId}`);
