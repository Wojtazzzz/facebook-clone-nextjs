import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePokes = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const poke = (friendId: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(friendId, {
            onSuccess: () => queryClient.invalidateQueries(['friends']),
        });
    };

    return {
        poke,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.post('/api/pokes', { friend_id: friendId });
