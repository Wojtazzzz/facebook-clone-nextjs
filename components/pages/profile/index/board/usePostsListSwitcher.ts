import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { IPostList } from '@utils/types';

export const usePostsListSwitcher = () => {
    const [postsList, setPostsList] = useState<IPostList>('own');

    const changeList = (event: ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;

        if (!isPostListType(type)) return;

        setPostsList(type);
    };

    return {
        postsList,
        changeList,
    };
};

function isPostListType(value: string): value is IPostList {
    return ['own', 'all', 'hidden', 'saved'].includes(value);
}
