import { useQuery } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import { getUserEmailQK } from '@utils/queryKeys';

export const useGetUserEmail = () => {
    return useQuery(getUserEmailQK(), queryFn);
};

const queryFn = () => axios.get<string>('/api/user/email').then((response) => response.data);
