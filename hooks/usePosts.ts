import { useEffect } from 'react';
import { useAxios } from '@hooks/useAxios';
import { usePaginatedData } from '@hooks/usePaginatedData';

import type { PostType } from '@ctypes/features/PostType';

export const usePosts = (postId: number) => {
    const { reloadData: reloadPosts } = usePaginatedData<PostType>('/api/posts', 15);
    const { state, sendRequest } = useAxios();

    useEffect(() => {
        if (state.status === 'LOADING') return;

        if (state.status === 'SUCCESS') {
            reloadPosts();
        }
    }, [state, reloadPosts]);

    const removePost = () => {
        if (state.status === 'LOADING') return;

        sendRequest({
            method: 'DELETE',
            url: `/api/posts/${postId}`,
        });
    };

    return { isLoading: state.status === 'LOADING', removePost };
};
