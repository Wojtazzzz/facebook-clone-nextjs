import type { IPostList } from './types';

export const getPostsEndpoint = (type: IPostList, userId: number | undefined) => {
    switch (type) {
        case 'hidden':
            return '/api/hidden/posts';

        case 'saved':
            return '/api/saved/posts';

        case 'own':
            return `/api/users/${userId}/posts`;

        default:
        case 'all':
            return '/api/posts';
    }
};
