import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { QueryKey } from '@tanstack/react-query';
import { useConfirmModal } from '@hooks/useConfirmModal';
import { useAlertModal } from '@hooks/useAlertModal';

export const useRemovePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();
    const { confirm } = useConfirmModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onError: () => alert('Something went wrong, try again later'),
    });

    const remove = (id: number) => {
        if (mutation.isLoading) return;

        confirm('Are you sure you want to delete this post?', () => mutation.mutate(id));
    };

    return {
        remove,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.delete(`/api/posts/${id}`);
