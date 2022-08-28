import { useInfiniteQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';
import type { IPaginatedResponse } from '@utils/types';

export const useInfiniteData = <T>({ queryKey, endpoint, params, options }: IUseInfiniteDataArgs) => {
    const {
        data,
        isError,
        error,
        isLoading,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        queryKey,
        async ({ pageParam = 1 }) =>
            await axios
                .get<IPaginatedResponse<T>>(`${endpoint}`, { params: { ...params, page: pageParam } })
                .then((response) => response.data),
        {
            getPreviousPageParam: (_, pages) => pages[pages.length - 1].prev_page,
            getNextPageParam: (_, pages) => pages[pages.length - 1].next_page,
            ...options,
        }
    );

    const isEmpty = (data?.pages[0].data.length ?? 0) <= 0;
    const flatData = data?.pages.flatMap((page) => page.data);

    return {
        data: flatData,
        isLoading,
        isError,
        error,
        isEmpty,
        isFetchingNextPage,
        isFetchingPreviousPage,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
    };
};

type IUseInfiniteDataArgs = {
    queryKey: string[];
    endpoint: string;
    params?: {};
    options?: {};
};
