import { useInfiniteData } from '@hooks/useInfiniteData';
import type { IPost, IPostList } from '@utils/types';

export const useGetPosts = (postsList: IPostList, userId: number | undefined) => {
    const queryKey = getQueryKey(postsList, userId);
    const endpoint = getEndpoint(postsList, userId);

    const data = useInfiniteData<IPost>({
        queryKey,
        endpoint,
        options: {
            enabled: !!userId,
        },
    });

    return {
        ...data,
        queryKey,
    };
};

const getEndpoint = (type: IPostList, userId: number | undefined) => {
    switch (type) {
        case 'hidden':
            return '/api/hidden/posts';

        case 'saved':
            return '/api/saved/posts';

        default:
        case 'own':
            return `/api/users/${userId}/posts`;
    }
};

const getQueryKey = (type: IPostList, userId: number | undefined) => {
    switch (type) {
        case 'hidden':
            return ['posts', 'hidden'];

        case 'saved':
            return ['posts', 'saved'];

        default:
        case 'own':
            return ['posts', 'own', userId];
    }
};
