import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axios } from '@utils/axios';
import type { QueryKey } from '@tanstack/react-query';
import { useAlertModal } from '@hooks/useAlertModal';

export const useToggleCommenting = (queryKey: QueryKey) => {
    const queryClient = useQueryClient();
    const { alert } = useAlertModal();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onError: () => alert('Something went wrong, try again later'),
    });

    const toggleCommenting = (id: number) => {
        if (mutation.isLoading) return;

        mutation.mutate(id);
    };

    return {
        toggleCommenting,
        ...mutation,
    };
};

const mutationFn = (id: number) => axios.put(`/api/posts/${id}/commenting`);
