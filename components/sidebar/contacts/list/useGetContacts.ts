import { useInfiniteData } from '@hooks/useInfiniteData';
import { getContactsQK } from '@utils/queryKeys';
import type { IFriend } from '@utils/types';

export const useGetContacts = () => {
    return useInfiniteData<IFriend>({
        queryKey: getContactsQK(),
        endpoint: '/api/contacts',
    });
};
