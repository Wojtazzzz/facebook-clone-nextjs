import type { ListType } from '@enums/ListType';

export const getPathForPagination = (type: ListType | string | string[], userId = 0) => {
	switch (type) {
		case 'suggests':
			return '/api/suggests';

		case 'invites':
			return '/api/invites';

		case 'pokes':
			return '/api/pokes';

		default:
		case 'friends':
			return `/api/friends/${userId}`;
	}
};
