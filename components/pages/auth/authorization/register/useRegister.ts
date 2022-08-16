import { axios } from '@libs/axios';
import type { IValidationError } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const useRegister = () => {
    const queryClient = useQueryClient();
    const mutation: IMutationFn = useMutation(mutationFn);

    const register = async () => {
        if (mutation.isLoading) return;

        await csrf();

        mutation.mutate(undefined, {
            onSuccess: () => queryClient.invalidateQueries(['user']),
        });
    };

    return {
        register,
        ...mutation,
        errorMessage: mutation.error?.response.data.message,
    };
};

const csrf = () => axios.get('/api/csrf-cookie');
const mutationFn = () => axios.post('/api/register');

type IMutationFn = UseMutationResult<AxiosResponse<any, any>, IValidationError, void, unknown>;
