import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { QueryKey } from '@tanstack/react-query';
import { useAlertModal } from '@hooks/useAlertModal';

export const useHidePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onError: () => alert('Something went wrong, try again later'),
    });

    const hide = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        hide,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post('/api/hidden', { post_id: id });
