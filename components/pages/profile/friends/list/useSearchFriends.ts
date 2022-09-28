import { useInfiniteData } from '@hooks/useInfiniteData';
import { getSearchFriendsQK } from '@utils/queryKeys';
import type { IFriend } from '@utils/types';

export const useSearchFriends = (userId: number, query: string) => {
    return useInfiniteData<IFriend>({
        queryKey: getSearchFriendsQK(userId, query),
        endpoint: `/api/users/${userId}/friends`,
        params: {
            search: query,
        },
    });
};
