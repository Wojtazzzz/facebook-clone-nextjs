import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import axios from '@lib/axios';
import { AuthMiddleware } from '@enums/AuthMiddleware';

interface useAuthProps {
    middleware?: AuthMiddleware,
    redirectIfAuthenticated?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: useAuthProps = {}) => {
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const router = useRouter();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error;

                router.push('/verify-email');
            })
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }) => {
        setIsRequestLoading(true);
        await csrf();

        setErrors([]);

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error;

                setErrors(Object.values(error.response.data.errors).flat());
            })
            .finally(() => setIsRequestLoading(false));
    }

    const login = async ({ setErrors, ...props }) => {
        setIsRequestLoading(true);
        await csrf();

        setErrors([]);

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {

                if (error.response.status !== 422) throw error

                setErrors(Object.values(error.response.data.errors).flat())
            })
            .finally(() => setIsRequestLoading(false));
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/logout');

            mutate();
        }

        window.location.href = '/login';
    }

    useEffect(() => {
        if (middleware === AuthMiddleware.GUEST && redirectIfAuthenticated && user) router.push('/login');
        if (middleware === AuthMiddleware.AUTH && error) logout();
    }, [user, error])

    return {
        user,
        isRequestLoading,
        register,
        login,
        logout,
    }
}