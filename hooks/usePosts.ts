import { useAxios } from '@hooks/useAxios';
import { useMatchMutate } from '@hooks/useMatchMutate';

import type { IPostPayload } from '@utils/types';
import type { ICreatePostResponse } from '@utils/types';

type Response = ICreatePostResponse | {};

export const usePosts = () => {
    const matchMutate = useMatchMutate();
    const { state, sendRequest } = useAxios<Response>();

    const refreshData = () => matchMutate(/\/posts/);

    const create = async (data: IPostPayload) => {
        if (state.status === 'LOADING') return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        await sendRequest({
            method: 'POST',
            url: '/api/posts',
            data: formData,
        });

        refreshData();
    };

    const remove = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'DELETE',
            url: `/api/posts/${id}`,
        });

        refreshData();
    };

    const hide = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'POST',
            url: '/api/hidden/posts',
            data: {
                post_id: id,
            },
        });

        refreshData();
    };

    const unhide = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'DELETE',
            url: `/api/hidden/posts/${id}`,
            data: {
                post_id: id,
            },
        });

        refreshData();
    };

    const save = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'POST',
            url: '/api/saved/posts',
            data: {
                post_id: id,
            },
        });

        refreshData();
    };

    const unsave = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'DELETE',
            url: `/api/saved/posts/${id}`,
            data: {
                post_id: id,
            },
        });

        refreshData();
    };

    const like = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'POST',
            url: `/api/posts/${id}/likes`,
        });

        refreshData();
    };

    const unlike = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'DELETE',
            url: `/api/posts/${id}/likes`,
        });

        refreshData();
    };

    const isLoading = state.status === 'LOADING';

    return {
        state,
        isLoading,
        create,
        remove,
        hide,
        unhide,
        save,
        unsave,
        like,
        unlike,
    };
};
