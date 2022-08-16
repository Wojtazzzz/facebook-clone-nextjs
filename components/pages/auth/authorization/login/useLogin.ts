import { axios } from '@libs/axios';
import type { ILoginPayload, IValidationError } from '@utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UseMutationResult } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const useLogin = () => {
    const queryClient = useQueryClient();
    const mutation: IMutationFn = useMutation(mutationFn);

    const login = async (data: ILoginPayload) => {
        if (mutation.isLoading) return;

        await csrf();

        mutation.mutate(data, {
            onSuccess: () => queryClient.invalidateQueries(['user']),
        });
    };

    return {
        login,
        ...mutation,
        errorMessage: mutation.error?.response.data.message,
    };
};

const mutationFn = (data: ILoginPayload) => axios.post('/api/login', data);
const csrf = () => axios.get('/api/csrf-cookie');

type IMutationFn = UseMutationResult<AxiosResponse<any, any>, IValidationError, ILoginPayload, unknown>;
