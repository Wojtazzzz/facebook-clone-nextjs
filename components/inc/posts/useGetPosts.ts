import { useInfiniteData } from '@hooks/useInfiniteData';
import { getPostsQueryKey } from '@utils/getPostsQueryKey';
import type { IPost, IPostList } from '@utils/types';

export const useGetPosts = (postsList: IPostList, userId: number | undefined) => {
    const queryKey = getPostsQueryKey(postsList, userId);
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

        case 'own':
            return `/api/users/${userId}/posts`;

        default:
        case 'all':
            return '/api/posts';
    }
};
