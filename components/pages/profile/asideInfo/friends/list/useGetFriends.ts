import { axios } from '@libs/axios';
import { useQuery } from '@tanstack/react-query';
import type { IUser } from '@utils/types';

export const useGetFriends = (userId: number) => {
    return useQuery(['friends', userId], () => queryFn(userId));
};

const queryFn = (userId: number) =>
    axios.get<IUser[]>(`/api/users/${userId}/friends?count=9`).then((response) => response.data);
