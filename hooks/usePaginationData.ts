import { useState, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios from '@lib/axios';
import { StatePaginationStatus } from '@enums/StatePaginationStatus';
import { mutate } from 'swr';

const axiosConfig = {
	transformResponse: [
		function (axiosData: string) {
			const jsonData = JSON.parse(axiosData);
			let data = jsonData.paginator.data;

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
		if (!data) return;

		setFlatData(data.flat() as []);

		return () => AxiosAbortController.abort();
	}, [data, AxiosAbortController]);

	useEffect(() => {
		if (flatData[0] !== undefined) {
			setState(StatePaginationStatus.SUCCESS);
		}
	}, [flatData]);

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
