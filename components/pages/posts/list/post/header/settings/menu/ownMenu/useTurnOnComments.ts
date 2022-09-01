import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { useAuth } from '@hooks/useAuth';

export const useTurnOnComments = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);
    const { user } = useAuth();

    const turnOnComments = (id: number) => {
        if (mutation.isLoading || !user) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts', 'all']);
                queryClient.invalidateQueries(['posts', 'OWN', user.id]);
            },
        });
    };

    return {
        turnOnComments,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.put(`/api/posts/${id}/turn-on-comments`);
