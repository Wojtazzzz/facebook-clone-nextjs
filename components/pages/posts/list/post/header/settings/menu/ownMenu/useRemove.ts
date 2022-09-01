import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import { useAuth } from '@hooks/useAuth';

export const useRemove = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);
    const { user } = useAuth();

    const remove = (id: number) => {
        if (mutation.isLoading || !user) return;

        mutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts', 'all']);
                queryClient.invalidateQueries(['posts', 'OWN', user.id]);
            },
        });
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/posts/${id}`);
