import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRemove = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const remove = (data: IRemovePayload) => {
        if (mutation.isLoading) return;

        mutation.mutate(data, {
            onSuccess: () => queryClient.invalidateQueries(['comments']),
        });
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
