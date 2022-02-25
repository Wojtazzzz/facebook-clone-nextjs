import { useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@lib/axios';
import { ChatMessageType } from '@ctypes/features/ChatMessageType';

export const useChat = (friendId: number) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const getKey = (pageIndex: number, previousPageData: []) => {
		if (previousPageData && !previousPageData.length) return null;

		return `/api/messages/${friendId}?page=${++pageIndex}`;
	};

	const fetcher = (url: string) =>
		axios
			.get(url)
			.then(response => response.data.paginator.data)
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));

	// Fetching data
	const { data: messages } = useSWRInfinite<ChatMessageType[]>(getKey, fetcher);

	return { messages, isLoading, isError };
};
