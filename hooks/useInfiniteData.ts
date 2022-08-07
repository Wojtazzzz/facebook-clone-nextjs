import { useInfiniteQuery } from '@tanstack/react-query';
import { axios } from '@libs/axios';

import type { IPaginatedResponse } from '@utils/types';

export const useInfiniteData = <T>(queryKey: string[], endpoint: string) => {
    const {
        data,
        isError,
        isLoading,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
        queryKey,
        async ({ pageParam = 1 }) => {
            return await axios
                .get<IPaginatedResponse<T>>(`${endpoint}?page=${pageParam}`)
                .then((response) => response.data);
        },
        {
            getPreviousPageParam: (_, pages) => pages[pages.length - 1].prev_page,
            getNextPageParam: (_, pages) => pages[pages.length - 1].next_page,
        }
    );

    const isEmpty = (data?.pages[0].data.length ?? 0) <= 0;

    return {
        data,
        isLoading,
        isError,
        isEmpty,
        isFetchingNextPage,
        isFetchingPreviousPage,
        hasNextPage,
        hasPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
    };
};
