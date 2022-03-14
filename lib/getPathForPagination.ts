import type { ListType } from '@enums/ListType';

export const getPathForPagination = (type: ListType | string | string[], userId = 0) => {
	switch (type) {
		case 'suggests':
			return '/api/friendship/suggests';

		case 'invites':
			return '/api/friendship/invites';

		case 'pokes':
			return '/api/friendship/pokes';

		default:
		case 'friends':
			return `/api/friendship/friends/${userId}`;
	}
};
