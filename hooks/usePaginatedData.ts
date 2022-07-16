import { useState, useEffect, useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';

import axios, { objectsIntoArray } from '@libs/axios';

import type { IUsePaginatedDataState } from '@utils/types';

export const usePaginatedData = <T>(key: string, perList = 10) => {
    const [state, setState] = useState<IUsePaginatedDataState>('LOADING');
    const [flatData, setFlatData] = useState<T[]>([]);
    const AxiosAbortController = useMemo(() => new AbortController(), []);

    const getKey = (pageIndex: number, previousPageData: []) => {
        if (previousPageData && !previousPageData.length) return null;
        return `${key}?page=${++pageIndex}`;
    };

    const fetcher = (url: string) =>
        axios
            .get(url, objectsIntoArray)
            .then((response) => response.data)
            .catch((error) => {
                if (error.message !== 'canceled') {
                    setState('ERROR');
                }

                throw error;
            });

    const { data, size, setSize, mutate } = useSWRInfinite<T[]>(getKey, fetcher);

    useEffect(() => {
        setState('LOADING');

        return () => AxiosAbortController.abort();
    }, [key, AxiosAbortController]);

    useEffect(() => {
        if (!data) return;

        setFlatData(data.flat());
        setState('SUCCESS');

        return () => AxiosAbortController.abort();
    }, [data, AxiosAbortController]);

    const loadMore = () => {
        setState('FETCHING');
        setSize(size + 1);
    };

    const isReachedEnd = (flatData.length === 0 || (data && data[data.length - 1].length < perList)) ?? true;
    const isEmpty = flatData.length === 0 || !data;

    return {
        data: flatData,
        state,
        isEmpty,
        isReachedEnd,
        loadMore,
        reloadData: mutate,
    };
};
