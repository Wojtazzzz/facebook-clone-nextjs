import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useAxios } from '@hooks/useAxios';

import axios from '@libs/axios';
import Axios from 'axios';

import type { UserType } from '@ctypes/features/UserType';
import type { AuthMiddlewareType } from '@ctypes/AuthMiddlewareType';
import type { LoginPayload } from '@ctypes/forms/LoginPayload';

export const useAuth = (middleware?: AuthMiddlewareType) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { state, sendRequest } = useAxios();

    const fetcher = () =>
        axios
            .get('/api/user')
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });

    const { data: user, error: fetchError, mutate } = useSWR<UserType>('/api/user', fetcher);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async () => {
        setIsLoading(true);
        setError('');

        await csrf();

        sendRequest({
            method: 'POST',
            url: '/register',
        });
    };

    const login = async (data: LoginPayload) => {
        setIsLoading(true);
        setError('');

        await csrf();

        sendRequest({
            method: 'POST',
            url: '/login',
            data,
        });
    };

    const logout = useCallback(async () => {
        if (!fetchError) {
            setIsLoading(true);

            await sendRequest({
                method: 'POST',
                url: '/logout',
            });
        }

        window.location.pathname = '/login';
    }, [fetchError, sendRequest]);

    useEffect(() => {
        if (state.status === 'LOADING') return;

        setIsLoading(false);

        if (state.status === 'ERROR') {
            Axios.isAxiosError(state.error)
                ? setError(state.error.response?.data.message ?? state.error.message)
                : setError('Something went wrong, try again later');
        }
    }, [state, mutate]);

    useEffect(() => {
        if (middleware === 'GUEST' && user) router.push('/');
        if (middleware === 'AUTH' && fetchError) logout();
    }, [user, fetchError, middleware, router, logout]);

    return {
        user,
        isLoading,
        error,
        register,
        login,
        logout,
    };
};
