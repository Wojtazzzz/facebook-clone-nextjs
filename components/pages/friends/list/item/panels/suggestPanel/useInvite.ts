import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';

export const useInvite = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const invite = (friendId: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(friendId, {
            onSuccess: () => queryClient.invalidateQueries(['Suggests']),
        });
    };

    return {
        invite,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.post('/api/invites', { friend_id: friendId });
