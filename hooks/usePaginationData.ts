import { useState, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@lib/axios';
import { StatePaginationStatus } from '@enums/StatePaginationStatus';

const axiosConfig = {
	transformResponse: [
		function (responseData: any) {
			let data = JSON.parse(responseData);

			if (!Array.isArray(data)) {
				data = [...Object.values(data)] as [];
			}

			return data;
		},
	],
};

export const usePaginationData = (key: string) => {
	const [state, setState] = useState<StatePaginationStatus>(StatePaginationStatus.LOADING);
	const [flatData, setFlatData] = useState([]);
	const AxiosAbortController = useMemo(() => new AbortController(), []);

	const getKey = (pageIndex: number, previousPageData: []) => {
		if (previousPageData && !previousPageData.length) return null;

		return `${key}?page=${++pageIndex}`;
	};

	const fetcher = (url: string) =>
		axios
			.get(url, axiosConfig)
			.then(response => response.data)
			.catch(error => {
				if (error.message !== 'canceled') {
					setState(StatePaginationStatus.ERROR);
				}
			});

	const { data, size, setSize, mutate } = useSWRInfinite<unknown[]>(getKey, fetcher);

	useEffect(() => {
		setState(StatePaginationStatus.LOADING);
	}, [key]);

	useEffect(() => {
		if (!data) return;

		setFlatData(data.flat() as []);
		setState(StatePaginationStatus.SUCCESS);

		return () => AxiosAbortController.abort();
	}, [data, AxiosAbortController]);

	const loadMore = () => {
		setState(StatePaginationStatus.FETCHING);
		setSize(size + 1);
	};

	const reloadData = () => {
		mutate();
	};

	return {
		data: flatData,
		state,
		isEmpty: flatData?.length === 0,
		isReachedEnd: flatData?.length === 0 || (data && data[data.length - 1]?.length < 10),
		loadMore,
		reloadData,
	};
};
