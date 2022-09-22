import type { IUserSearchResult } from '@utils/types';
import { useInfiniteData } from './useInfiniteData';

export const useSearch = (endpoint: string, query: string) => {
    const { data, isError, isLoading, isEmpty, hasNextPage, fetchNextPage } = useInfiniteData<IUserSearchResult>({
        queryKey: ['search', query],
        endpoint: endpoint,
        params: {
            search: query,
        },
    });

    return {
        data,
        isError,
        isLoading,
        isEmpty,
        hasNextPage,
        fetchNextPage,
    };
};
