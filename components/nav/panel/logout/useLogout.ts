import { useCallback } from 'react';
import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(['user']),
    });

    const logout = useCallback(async () => {
        if (mutation.isLoading) return;

        mutation.mutate();
    }, [mutation]);

    return {
        logout,
        ...mutation,
    };
};

const mutationFn = () => axios.post('/api/logout');
