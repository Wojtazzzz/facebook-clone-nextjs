import { axios } from '@libs/axios';
import { useQuery } from '@tanstack/react-query';
import type { IFriend } from '@utils/types';

export const useGetFriendsByCount = (userId: number, count: number) => {
    return useQuery(['friendsByCount', { userId, count }], () => queryFn(userId, count));
};

type IFriendsWithCount = {
    friends: IFriend[];
    count: number;
};

const queryFn = (userId: number, count: number) =>
    axios
        .get<IFriendsWithCount>(`/api/users/${userId}/friends/getByCount?count=${count}`)
        .then((response) => response.data);
