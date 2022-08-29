import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { useAuth } from '@hooks/useAuth';

export const useTurnOffComments = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);
    const { user } = useAuth();

    const turnOffComments = (id: number) => {
        if (mutation.isLoading || !user) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts', 'all']);
                queryClient.invalidateQueries(['posts', { user: user.id }]);
            },
        });
    };

    return {
        turnOffComments,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.put(`/api/posts/${id}/turn-off-comments`);
