import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserQK } from '@utils/queryKeys';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(getUserQK()),
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
