import { useMutation, useQueryClient } from '@tanstack/react-query';

import { axios } from '@libs/axios';

import type { IPostPayload } from '@utils/types';

export const usePosts = () => {
    const queryClient = useQueryClient();

    const createMutation = useMutation((data: FormData) => axios.post('/api/posts', data));
    const removeMutation = useMutation((id: number) => axios.delete(`/api/posts/${id}`));
    const hideMutation = useMutation((id: number) => axios.post('/api/hidden/posts', { post_id: id }));
    const unhideMutation = useMutation((id: number) => axios.delete(`/api/hidden/posts/${id}`));
    const saveMutation = useMutation((id: number) => axios.post('/api/saved/posts', { post_id: id }));
    const unsaveMutation = useMutation((id: number) => axios.delete(`/api/saved/posts/${id}`));
    const likeMutation = useMutation((id: number) => axios.post(`/api/posts/${id}/likes`));
    const unlikeMutation = useMutation((id: number) => axios.delete(`/api/posts/${id}/likes`));

    const queryOptions = {
        onSuccess: () => queryClient.invalidateQueries(['posts']),
    };

    const create = (data: IPostPayload, onSuccess: () => void) => {
        if (createMutation.isLoading) return;

        const formData = new FormData();
        formData.append('content', data.content);

        data.images.forEach((img) => formData.append('images[]', img));

        createMutation.mutate(formData, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['OWN']);
                onSuccess();
            },
        });
    };

    const remove = (id: number) => {
        if (removeMutation.isLoading) return;

        removeMutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                queryClient.invalidateQueries(['OWN']);
            },
        });
    };

    const hide = (id: number) => {
        if (hideMutation.isLoading) return;

        hideMutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(['posts']),
        });
    };

    const unhide = (id: number) => {
        if (unhideMutation.isLoading) return;

        unhideMutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(['HIDDEN']),
        });
    };

    const save = (id: number, onSuccess: () => void) => {
        if (saveMutation.isLoading) return;

        saveMutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['posts']);
                onSuccess();
            },
        });
    };

    const unsave = (id: number) => {
        if (unsaveMutation.isLoading) return;

        unsaveMutation.mutate(id, {
            onSuccess: () => queryClient.invalidateQueries(['SAVED']),
        });
    };

    const like = (id: number) => {
        if (likeMutation.isLoading) return;

        likeMutation.mutate(id, queryOptions);
    };

    const unlike = (id: number) => {
        if (unlikeMutation.isLoading) return;

        unlikeMutation.mutate(id, queryOptions);
    };

    return {
        useCreate: () => ({
            create,
            ...createMutation,
        }),

        useRemove: () => ({
            remove,
            ...removeMutation,
        }),

        useLike: () => ({
            like,
            ...likeMutation,
        }),

        useUnlike: () => ({
            unlike,
            ...unlikeMutation,
        }),

        useSave: () => ({
            save,
            ...saveMutation,
        }),

        useUnsave: () => ({
            unsave,
            ...unsaveMutation,
        }),

        useHide: () => ({
            hide,
            ...hideMutation,
        }),

        useUnhide: () => ({
            unhide,
            ...unhideMutation,
        }),
    };
};
