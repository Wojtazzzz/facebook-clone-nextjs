import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { IAuthMiddleware } from '@utils/types';
import { useAuth } from '@hooks/useAuth';

export const useAuthMiddleware = (middleware: IAuthMiddleware) => {
    const router = useRouter();
    const { user, isError } = useAuth();

    useEffect(() => {
        if (middleware === 'AUTH' && isError) window.location.pathname = '/login';
        if (middleware === 'GUEST' && user) router.push('/');
    }, [isError, middleware, router, user]);
};
