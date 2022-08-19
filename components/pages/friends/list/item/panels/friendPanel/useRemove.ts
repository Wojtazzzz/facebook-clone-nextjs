import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useRemove = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const remove = (friendId: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(friendId, {
            onSuccess: () => queryClient.invalidateQueries(['Friends']),
        });
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.delete(`/api/friends/${friendId}`);
