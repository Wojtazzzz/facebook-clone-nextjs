import { axios } from '@utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@utils/getErrorMessage/getErrorMessage';
import { getPokesListQK } from '@utils/queryKeys';
import { useAlertModal } from './useAlertModal';

export const usePokes = () => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(getPokesListQK()),
        onError: (error) => {
            const message = getErrorMessage(error);

            alert(message);
        },
    });

    const poke = (friendId: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(friendId);
    };

    return {
        poke,
        ...mutation,
    };
};

const mutationFn = (friendId: number) => axios.post('/api/pokes', { friend_id: friendId });
