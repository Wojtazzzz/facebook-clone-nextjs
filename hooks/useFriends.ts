import { useEffect, useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@lib/axios';
import { ListType } from '@enums/ListType';

import type { UserType } from '@ctypes/features/UserType';

export const useFriends = (type: ListType, userId: number) => {
	const [isInitialLoading, setIsInitialLoading] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isReachingEnd, setIsReachingEnd] = useState(false);

	const getKey = (pageIndex: number, previousPageData: []) => {
		if (previousPageData && !previousPageData.length) return null;

		switch (type) {
			case ListType.SUGGEST:
				return `/api/suggests?page=${++pageIndex}`;

			case ListType.INVITES:
				return `/api/invites?page=${++pageIndex}`;

			default:
			case ListType.FRIENDS:
				return `/api/friends/${userId}?page=${++pageIndex}`;
		}
	};

	const fetcher = (url: string) =>
		axios
			.get(url)
			.then(response => response.data.paginator.data)
			.catch(() => setIsError(true))
			.finally(() => setIsInitialLoading(false));

	// Fetching data
	const { data, size, setSize } = useSWRInfinite<UserType[]>(getKey, fetcher);

	useEffect(() => {
		if (!data) return;

		if (data.length > 0) {
			setIsInitialLoading(false);
		}

		setIsLoading(false);

		const isEmpty = data?.[0]?.length === 0;
		setIsReachingEnd(isEmpty || (data && data[data.length - 1]?.length < 10));
	}, [data]);

	const loadMore = () => {
		setIsLoading(true);
		setSize(size + 1);
	};

	return {
		friends: data?.flat() ?? [],
		isInitialLoading,
		isLoading,
		isError,
		isReachingEnd,
		loadMore,
	};
};
