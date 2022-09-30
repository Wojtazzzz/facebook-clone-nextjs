import { useInfiniteData } from '@hooks/useInfiniteData';
import { getSearchUsersQK } from '@utils/queryKeys';
import type { IFriend } from '@utils/types';

export const useSearchUsers = (query: string) => {
    return useInfiniteData<IFriend>({
        queryKey: getSearchUsersQK(query),
        endpoint: '/api/users',
        params: {
            search: query,
        },
    });
};
