import { axios } from '@libs/axios';
import { useQuery } from '@tanstack/react-query';
import { getCheckUnreadNotificationsQK } from '@utils/queryKeys';

export const useCheckForUnread = () => {
    return useQuery(getCheckUnreadNotificationsQK(), queryFn);
};

const queryFn = () => axios.get<boolean>('/api/notifications/checkUnread').then((response) => response.data);
