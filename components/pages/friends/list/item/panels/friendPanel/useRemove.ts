import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import { getFriendsListQK } from '@utils/queryKeys';

export const useRemove = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(getFriendsListQK()),
    });

    const remove = (friendId: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(friendId);
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.delete(`/api/friends/${friendId}`);
