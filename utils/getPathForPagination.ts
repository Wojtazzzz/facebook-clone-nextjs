import type { FriendsListType } from '@ctypes/features/FriendsListType';

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
