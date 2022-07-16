import { IFriendsList } from '@utils/types';

const constValuesOfType: IFriendsList[] = ['SUGGESTS', 'INVITES', 'POKES', 'FRIENDS', undefined];
type IListType = typeof constValuesOfType[number];

export const isFriendsListType = (x: any): x is IListType => constValuesOfType.includes(x);
