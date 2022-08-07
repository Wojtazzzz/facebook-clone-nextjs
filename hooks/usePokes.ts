import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePokes = () => {
    const queryClient = useQueryClient();

    const pokeMutation = useMutation((friendId: number) => axios.post('/api/pokes', { friend_id: friendId }));

    const poke = (friendId: number) => {
        if (pokeMutation.isLoading) return;

        pokeMutation.mutate(friendId, {
            onSuccess: () => queryClient.invalidateQueries(['friends']),
        });
    };

    return {
        poke,
        ...pokeMutation,
    };
};
