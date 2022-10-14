import { useMutation } from '@tanstack/react-query';
import { axios } from '@utils/axios';

export const useRemoveFriend = () => {
    const mutation = useMutation(mutationFn);

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
