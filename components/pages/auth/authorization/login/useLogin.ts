import { axios } from '@utils/axios';
import type { ILoginPayload } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { csrf } from '@utils/csrf';
import { getUserQK } from '@utils/queryKeys';

export const useLogin = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onMutate: async () => await csrf(),
        onSuccess: () => queryClient.invalidateQueries(getUserQK()),
    });

    const login = async (data: ILoginPayload) => {
        if (mutation.isLoading) return;

        mutation.mutate(data);
    };

    return {
        login,
        ...mutation,
    };
};

const mutationFn = (data: ILoginPayload) => axios.post('/api/login', data);
