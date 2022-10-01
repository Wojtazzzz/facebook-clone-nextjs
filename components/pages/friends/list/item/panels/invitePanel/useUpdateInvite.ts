import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IUpdateInvite } from '@utils/types';
import { axios } from '@utils/axios';
import { getInvitesListQK } from '@utils/queryKeys';

export const useUpdateInvite = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(getInvitesListQK()),
    });

    const updateInvite = (data: IUpdateInvite) => {
        if (mutation.isLoading) return;

        mutation.mutate(data);
    };

    return {
        updateInvite,
        ...mutation,
    };
};

type IUpdateInviteResponse = {
    message: string;
};

const mutationFn = ({ friendId, status }: IUpdateInvite) =>
    axios.put<IUpdateInviteResponse>(`/api/invites/${friendId}`, { status });
