import { axios } from '@libs/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { csrf } from '@utils/csrf';
import { getUserQK } from '@utils/queryKeys';

export const useRegister = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onMutate: async () => await csrf(),
        onSuccess: () => queryClient.invalidateQueries(getUserQK()),
    });

    const register = async () => {
        if (mutation.isLoading) return;

        mutation.mutate();
    };

    return {
        register,
        ...mutation,
    };
};

const mutationFn = () => axios.post('/api/register');
