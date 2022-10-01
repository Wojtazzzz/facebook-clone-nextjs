import { axios } from '@utils/axios';
import type { IUser } from '@utils/types';
import { useQuery } from '@tanstack/react-query';
import { getUserQK } from '@utils/queryKeys';

export const useAuth = () => {
    const { data: user, ...rest } = useQuery<IUser>(getUserQK(), queryFn);

    return {
        user,
        ...rest,
    };
};

const queryFn = () => axios.get('/api/user').then((response) => response.data);
