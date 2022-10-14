import { useMutation } from '@tanstack/react-query';
import { axios } from '@utils/axios';

export const useInviteFriend = () => {
    const mutation = useMutation(mutationFn);

    const invite = (friendId: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(friendId);
    };

    return {
        invite,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.post('/api/invites', { friend_id: friendId });
