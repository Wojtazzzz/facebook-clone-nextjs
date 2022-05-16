import { FriendsListType } from '@ctypes/features/FriendsListType';

const constValuesOfType: FriendsListType[] = ['SUGGESTS', 'INVITES', 'POKES', 'FRIENDS', undefined];
type TYPE = typeof constValuesOfType[number];

export const isFriendsListType = (x: any): x is TYPE => constValuesOfType.includes(x);
