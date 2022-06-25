import { useEffect } from 'react';
import { useAxios } from '@hooks/useAxios';
import { usePaginatedData } from '@hooks/usePaginatedData';

import type { PostType } from '@ctypes/features/PostType';
import type { PostPayload } from '@ctypes/forms/PostPayload';
import type { CreatePostResponse } from '@ctypes/responses/CreatePostResponse';

type Response = CreatePostResponse | {};

export const usePosts = () => {
    const { reloadData: reloadPosts } = usePaginatedData<PostType>('/api/posts', 15);
    const { state, sendRequest } = useAxios<Response>();

    useEffect(() => {
        if (state.status === 'LOADING') return;
        if (state.status === 'SUCCESS') reloadPosts();
    }, [state, reloadPosts]);

    const createPost = (data: PostPayload) => {
        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        sendRequest({ method: 'POST', url: '/api/posts', data: formData });
    };

    const removePost = (postId: number) => {
        if (state.status === 'LOADING') return;

        sendRequest({
            method: 'DELETE',
            url: `/api/posts/${postId}`,
        });
    };

    const isLoading = state.status === 'LOADING';

    return {
        state,
        isLoading,
        createPost,
        removePost,
    };
};
