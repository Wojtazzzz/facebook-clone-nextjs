import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { QueryKey } from '@tanstack/react-query';
import { useAlertModal } from '@hooks/useAlertModal';

export const useSavePost = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onError: () => alert('Something went wrong, try again later'),
    });

    const save = (id: number, onSuccess: () => void) => {
        if (mutation.isLoading) return;

        mutation.mutate(id, {
            onSuccess,
        });
    };

    return {
        save,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.post('/api/saved', { post_id: id });
