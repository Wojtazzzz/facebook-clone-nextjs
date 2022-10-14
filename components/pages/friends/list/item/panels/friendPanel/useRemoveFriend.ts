import { useConfirmModal } from '@hooks/useConfirmModal';
import { useMutation } from '@tanstack/react-query';
import { axios } from '@utils/axios';

export const useRemoveFriend = () => {
    const mutation = useMutation(mutationFn);
    const { confirm } = useConfirmModal();

    const remove = (friendId: number) => {
        if (mutation.isLoading) return;

        confirm('Are you sure you want to delete this user from friends?', () => mutation.mutate(friendId));
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.delete(`/api/friends/${friendId}`);
