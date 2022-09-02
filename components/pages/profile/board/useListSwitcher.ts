import { useState } from 'react';
import type { ChangeEvent } from 'react';

type IPostQueryKeyType = ['posts', 'own', number] | ['posts', 'hidden'] | ['posts', 'saved'];
type IPostListToChoose = 'own' | 'hidden' | 'saved';

export const useListSwitcher = (userId: number) => {
    const [queryKey, setQueryKey] = useState<IPostQueryKeyType>(['posts', 'own', userId]);
    const [endpoint, setEndpoint] = useState(`/api/users/${userId}/posts`);

    const changeList = (event: ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;

        if (!isPostListType(type)) return;

        const queryKey = getQueryKey(type, userId);
        const path = getEndpoint(type, userId);

        setQueryKey(queryKey);
        setEndpoint(path);
    };

    return {
        queryKey,
        endpoint,
        changeList,
    };
};

function isPostListType(value: string): value is IPostListToChoose {
    return ['own', 'hidden', 'saved'].includes(value);
}

const getEndpoint = (type: IPostListToChoose, userId: number) => {
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

const getQueryKey = (type: IPostListToChoose, userId: number): IPostQueryKeyType => {
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
