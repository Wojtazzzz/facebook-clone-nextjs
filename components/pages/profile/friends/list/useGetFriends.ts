import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IFriend } from '@utils/types';

export const useGetFriends = (userId: number, query: string) => {
    return useInfiniteData<IFriend>({
        queryKey: ['search', { userId, query }],
        endpoint: `/api/users/${userId}/friends`,
        params: {
            search: query,
        },
    });
};
