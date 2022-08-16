import { axios } from '@libs/axios';
import type { IUser } from '@utils/types';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
    const { data: user, ...rest } = useQuery<IUser>(['user'], queryFn);

    return {
        user,
        ...rest,
    };
};

const queryFn = () => axios.get('/api/user').then((response) => response.data);
