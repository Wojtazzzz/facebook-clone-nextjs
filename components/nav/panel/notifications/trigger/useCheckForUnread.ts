import { axios } from '@libs/axios';
import { useQuery } from '@tanstack/react-query';

export const useCheckForUnread = () => {
    return useQuery(['notifications', 'checkUnread'], queryFn);
};

const queryFn = () => axios.get<boolean>('/api/notifications/checkUnread').then((response) => response.data);
