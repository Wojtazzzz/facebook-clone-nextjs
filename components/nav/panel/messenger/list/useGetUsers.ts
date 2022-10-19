import { useInfiniteData } from '@hooks/useInfiniteData';
import { getMessengerQK } from '@utils/queryKeys';
import type { IFriend } from '@utils/types';

export const useGetUsers = () => {
    return useInfiniteData<IFriend>({
        queryKey: getMessengerQK(),
        endpoint: '/api/messenger',
    });
};
