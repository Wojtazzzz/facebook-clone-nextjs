import { axios } from '@libs/axios';
import { useQuery } from '@tanstack/react-query';

export const useCheckForUnread = () => {
    return useQuery(['messenger', 'checkUnread'], queryFn);
};

const queryFn = () => axios.get<boolean>('/api/messages/checkUnread').then((response) => response.data);
