import { axios } from '@utils/axios';
import { useQuery } from '@tanstack/react-query';
import { getFriendsByCountQK } from '@utils/queryKeys';
import type { IFriend } from '@utils/types';

export const useGetFriendsByCount = (userId: number, count: number) => {
    return useQuery(getFriendsByCountQK(userId, count), () => queryFn(userId, count));
};

type IFriendsWithCount = {
    friends: IFriend[];
    count: number;
};

const queryFn = (userId: number, count: number) =>
    axios
        .get<IFriendsWithCount>(`/api/users/${userId}/friends/get-by-count?count=${count}`)
        .then((response) => response.data);
