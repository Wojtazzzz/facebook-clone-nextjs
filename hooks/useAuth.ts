import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import axios from '@lib/axios';
import { AuthMiddleware } from '@enums/AuthMiddleware';

import type { UserType } from '@ctypes/features/UserType';

export const useAuth = (middleware?: AuthMiddleware) => {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<never[]>([]);
	const router = useRouter();

	const {
		data: user,
		error,
		mutate,
	} = useSWR<UserType>('/api/user', () =>
		axios
			.get('/api/user')
			.then(response => response.data)
			.catch(error => {
				throw error;
			})
	);

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	const register = async () => {
		setIsLoading(true);
		await csrf();

		axios
			.post('/register')
			.then(() => mutate())
			.catch(error => {
				if (error.response.status !== 422) throw error;

				setErrors(Object.values(error.response.data.errors ?? []).flat() as never);
			})
			.finally(() => setIsLoading(false));
	};

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		await csrf();

		axios
			.post('/login', { email, password })
			.then(() => mutate())
			.catch(error => {
				if (error.response.status !== 422) throw error;

				setErrors(Object.values(error.response.data.errors ?? []).flat() as never);
			})
			.finally(() => setIsLoading(false));
	};

	const logout = async () => {
		if (!error) {
			setIsLoading(true);

			await axios.post('/logout');
			mutate();

			setIsLoading(false);
		}

		window.location.pathname = '/login';
	};

	useEffect(() => {
		if (middleware === AuthMiddleware.GUEST && user) router.push('/');
		if (middleware === AuthMiddleware.AUTH && error) logout();
	}, [user, error, middleware, router]);

	return {
		user,
		isLoading,
		errors,
		register,
		login,
		logout,
	};
};
