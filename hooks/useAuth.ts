import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { axios } from '@libs/axios';

import type { IUser, IValidationError } from '@utils/types';
import type { IAuthMiddleware } from '@utils/types';
import type { ILoginPayload } from '@utils/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

export const useAuth = (middleware?: IAuthMiddleware) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const queryOptions = useMemo(
        () => ({
            onSuccess: () => queryClient.invalidateQueries(['user']),
        }),
        [queryClient]
    );

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = useQuery<IUser>(['user'], () => axios.get('/api/user').then((response) => response.data));

    const registerMutation = useMutation<AxiosResponse<any, any>, IValidationError>(() => axios.post('/register'));
    const loginMutation = useMutation<AxiosResponse<any, any>, IValidationError, ILoginPayload>((data: ILoginPayload) =>
        axios.post('/login', data)
    );
    const logoutMutation = useMutation(() => axios.post('/logout'));

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async () => {
        if (registerMutation.isLoading) return;

        await csrf();

        registerMutation.mutate(undefined, queryOptions);
    };

    const login = async (data: ILoginPayload) => {
        if (loginMutation.isLoading) return;

        await csrf();

        loginMutation.mutate(data, queryOptions);
    };

    const logout = useCallback(async () => {
        if (logoutMutation.isLoading) return;

        logoutMutation.mutate(undefined, queryOptions);
    }, [logoutMutation, queryOptions]);

    useEffect(() => {
        if (middleware === 'AUTH' && isError) window.location.pathname = '/login';
        if (middleware === 'GUEST' && user) router.push('/');
    }, [isError, logout, middleware, router, user]);

    return {
        user,
        isLoading,
        error,

        useLogin: () => ({
            login,
            ...loginMutation,
            errorMessage: loginMutation.error?.response.data.message,
        }),

        useRegister: () => ({
            register,
            ...registerMutation,
            errorMessage: registerMutation.error?.response.data.message,
        }),

        useLogout: () => ({
            logout,
            ...logoutMutation,
        }),
    };
};
