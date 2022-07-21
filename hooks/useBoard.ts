import { useState } from 'react';
import { usePaginatedData } from '@hooks/usePaginatedData';

import type { IPost, IPostsEndpoints } from '@utils/types';

const endpoints = {
    OWN: '/api/posts/self',
    HIDDEN: '/api/hidden/posts',
    SAVED: '/api/saved/posts',
} as const;

export const useBoard = () => {
    const [endpoint, setEndpoint] = useState<IPostsEndpoints>('/api/posts/self');
    const { data, state, isEmpty, isReachedEnd, loadMore } = usePaginatedData<IPost>(endpoint, 10);

    const changePostsList = (value: string) => {
        if (!(value === 'OWN' || value === 'SAVED' || value === 'HIDDEN')) return;

        const type = endpoints[value];

        setEndpoint(type);
    };

    return {
        data,
        state,
        isEmpty,
        isReachedEnd,
        loadMore,
        changePostsList,
    };
};
