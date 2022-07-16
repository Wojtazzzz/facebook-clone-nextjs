import { useEffect } from 'react';
import { useAxios } from '@hooks/useAxios';
import { usePaginatedData } from '@hooks/usePaginatedData';

import type { IPost } from '@utils/types';
import type { IPostPayload } from '@utils/types';
import type { ICreatePostResponse } from '@utils/types';

type Response = ICreatePostResponse | {};

export const usePosts = () => {
    const { reloadData: reload } = usePaginatedData<IPost>('/api/posts', 15);
    const { state, sendRequest } = useAxios<Response>();

    useEffect(() => {
        if (state.status !== 'SUCCESS') return;

        reload();
    }, [state, reload]);

    const create = (data: IPostPayload) => {
        if (state.status === 'LOADING') return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        sendRequest({ method: 'POST', url: '/api/posts', data: formData });
    };

    const remove = async (id: number) => {
        if (state.status === 'LOADING') return;

        await sendRequest({
            method: 'DELETE',
            url: `/api/posts/${id}`,
        });
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
    };

    const isLoading = state.status === 'LOADING';

    return {
        state,
        isLoading,
        create,
        remove,
        hide,
        save,
    };
};
