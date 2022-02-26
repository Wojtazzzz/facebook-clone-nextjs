import { useState, useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@lib/axios';

import type { ChatMessageType } from '@ctypes/features/ChatMessageType';

export const useChat = (friendId: number) => {
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isReachedEnd, setIsReachedEnd] = useState(false);

	const getKey = (pageIndex: number, previousPageData: []) => {
		if (previousPageData && !previousPageData.length) return null;

		return `/api/messages/${friendId}?page=${++pageIndex}`;
	};

	const fetcher = (url: string) =>
		axios
			.get(url)
			.then(response => response.data.paginator.data)
			.catch(() => setIsError(true))
			.finally(() => setIsInitialLoading(false));

	// Fetching data
	const { data, size, setSize, mutate } = useSWRInfinite<ChatMessageType[]>(getKey, fetcher);

	const loadMore = () => {
		if (isReachedEnd || isLoading) return;

		setIsLoading(true);
		setSize(size + 1);
	};

	useEffect(() => {
		if (!data) return;

		setIsLoading(false);

		const isEmpty = data?.length === 0;
		setIsReachedEnd(isEmpty || (data && data[data.length - 1]?.length < 10));
	}, [data]);

	return {
		data: data?.flat() ?? [],
		isInitialLoading,
		isLoading,
		isError,
		isReachedEnd,
		loadMore,
		mutate,
	};
};
