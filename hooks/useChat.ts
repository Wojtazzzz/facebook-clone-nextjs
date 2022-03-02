import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import Echo from 'laravel-echo';
import axios from '@lib/axios';
require('pusher-js');

import type { ChatMessageType } from '@ctypes/features/ChatMessageType';

export const useChat = (friendId: number) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isReachedEnd, setIsReachedEnd] = useState(false);
	const [isEmpty, setIsEmpty] = useState(false);

	const LaravelEcho = new Echo({
		broadcaster: 'pusher',
		key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
		cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
		forceTLS: true,
		authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcast`,
	});

	const getKey = (pageIndex: number, previousPageData: []) => {
		if (previousPageData && !previousPageData.length) return null;

		return `/api/messages/${friendId}?page=${++pageIndex}`;
	};

	const fetcher = (url: string) =>
		axios
			.get(url)
			.then(response => response.data.paginator.data)
			.catch(() => setIsError(true));

	// Fetching data
	const { data, size, setSize, mutate } = useSWRInfinite<ChatMessageType[]>(getKey, fetcher);

	const loadMore = () => {
		if (isReachedEnd || isLoading) return;

		setIsLoading(true);
		setSize(size + 1);
	};

	const sendMessage = (text: string, userId: number) => {
		LaravelEcho.private(`messages.${userId}.${friendId}`).listen('ChatMessageSended', () => {
			mutate();
		});

		axios.post('/api/messages', { text, receiver_id: friendId }).catch(() => setIsError(true));
	};

	useEffect(() => {
		if (!data) return;

		setIsLoading(false);

		setIsEmpty(data[0].length === 0);
		setIsReachedEnd(isEmpty || (data && data[data.length - 1].length < 10));
	}, [data, isEmpty]);

	return {
		data: data?.flat() ?? [],
		isLoading,
		isError,
		isEmpty,
		isReachedEnd,
		loadMore,
		sendMessage,
		mutate,
	};
};
