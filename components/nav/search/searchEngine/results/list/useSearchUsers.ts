import { useInfiniteData } from '@hooks/useInfiniteData';
import { getSearchUsersQK } from '@utils/queryKeys';
import type { IUserSearchResult } from '@utils/types';

export const useSearchUsers = (query: string) => {
    return useInfiniteData<IUserSearchResult>({
        queryKey: getSearchUsersQK(query),
        endpoint: '/api/users',
        params: {
            search: query,
        },
    });
};
