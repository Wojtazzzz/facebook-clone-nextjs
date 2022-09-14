import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(['user']),
    });

    const logout = () => {
        if (mutation.isLoading) return;

        mutation.mutate();
    };

    return {
        logout,
        ...mutation,
    };
};

const mutationFn = () => axios.post('/api/logout');
