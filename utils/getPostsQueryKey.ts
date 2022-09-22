import type { IPostList } from './types';
import type { QueryKey } from '@tanstack/react-query';

export const getPostsQueryKey = (type: IPostList, userId: number | undefined): QueryKey => {
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
