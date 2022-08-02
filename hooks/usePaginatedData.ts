import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';

import { axios } from '@libs/axios';

export const usePaginatedData = <T>(getKey: SWRInfiniteKeyLoader, perPage = 10) => {
    const { data, error, size, setSize, mutate } = useSWRInfinite<T[]>(getKey, fetcher);

    const loadMore = () => setSize(size + 1);
    const refresh = () => mutate();

    const isEmpty = data?.[0]?.length === 0;
    const isError = !!error;
    const isReachedEnd = isEmpty || (data && data[data.length - 1]?.length < perPage);
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

    return {
        data: data ? data.flat() : [],
        isReachedEnd,
        isEmpty,
        isLoadingInitialData,
        isLoadingMore,
        isError,
        loadMore,
        refresh,
    };
};

const fetcher = (url: string) => axios.get(url).then((response) => response.data);
