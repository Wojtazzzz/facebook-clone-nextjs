import type { IPostList } from './types';

export const getPostsQueryKey = (type: IPostList, userId: number | undefined) => {
    switch (type) {
        case 'hidden':
            return ['posts', 'hidden'];

        case 'saved':
            return ['posts', 'saved'];

        case 'own':
            return ['posts', 'own', userId];

        default:
        case 'all':
            return ['posts', 'all'];
    }
};
