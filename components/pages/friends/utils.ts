import type { FriendsListType } from '@ctypes/FriendsListType';

export const toCapitalizeCase = (name: FriendsListType) => {
    if (!name) {
        return 'Friends';
    }

    const string = name;

    const lowerCaseString = string.toLowerCase();
    const lowerCaseStringWithoutFirstChar = lowerCaseString.substring(1);
    const upperFirstChar = string.charAt(0).toUpperCase();

    const parsedString = upperFirstChar + lowerCaseStringWithoutFirstChar;

    return parsedString;
};

export const getPathForPagination = (type: FriendsListType, userId = 0) => {
    const listType = type?.toUpperCase() as FriendsListType;

    if (!listType) return `/api/friendship/friends/${userId}`;

    const PATHS = {
        SUGGESTS: '/api/friendship/suggests',
        INVITES: '/api/friendship/invites',
        POKES: '/api/pokes',
        FRIENDS: `/api/friendship/friends/${userId}`,
    } as const;

    return PATHS[listType];
};
