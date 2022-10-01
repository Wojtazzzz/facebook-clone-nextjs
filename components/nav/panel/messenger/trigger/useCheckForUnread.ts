import { axios } from '@utils/axios';
import { useQuery } from '@tanstack/react-query';
import { getCheckUnreadMessengerQK } from '@utils/queryKeys';

export const useCheckForUnread = () => {
    return useQuery(getCheckUnreadMessengerQK(), queryFn);
};

const queryFn = () => axios.get<boolean>('/api/messages/checkUnread').then((response) => response.data);
