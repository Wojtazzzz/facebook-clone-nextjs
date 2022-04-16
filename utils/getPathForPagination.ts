import type { FriendsListType } from '@ctypes/features/FriendsListType';

export const getPathForPagination = (type: FriendsListType | string | string[], userId = 0) => {
    if (!type) {
        return `/api/friendship/friends/${userId}`;
    }

    const checkValue = type.toString().toUpperCase();

    switch (checkValue) {
        case 'SUGGESTS':
            return '/api/friendship/suggests';

        case 'INVITES':
            return '/api/friendship/invites';

        case 'POKES':
            return '/api/pokes';

        default:
        case 'FRIENDS':
            return `/api/friendship/friends/${userId}`;
    }
};
