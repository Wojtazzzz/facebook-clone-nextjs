import axios from '@lib/axios';
import { useEffect } from 'react';

export const useAxios = (friendId: any, onSuccess: any, onError: any, onFinally: any) => {
	const AxiosAbortController = new AbortController();

	useEffect(() => {
		return () => AxiosAbortController.abort();
	}, []);

	const handleUse = () => {
		axios
			.post(
				'/api/destroy',
				{ user_id: friendId },
				{
					signal: AxiosAbortController.signal,
				}
			)
			.then(() => onSuccess())
			.catch(() => onError())
			.finally(() => onFinally());
	};

	return { handleUse };
};
