import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IUpdateInvite, IUpdateInviteStatus } from '@utils/types';
import { axios } from '@libs/axios';
import { getInvitesListQK } from '@utils/queryKeys';

type IUpdateInviteResponse = {
    message: string;
};

export const useUpdateInvite = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(mutationFn, {
        onSuccess: () => queryClient.invalidateQueries(getInvitesListQK()),
    });

    const updateInvite = (data: IUpdateInviteData) => {
        if (mutation.isLoading) return;

        mutation.mutate(data);
    };

    return {
        updateInvite,
        ...mutation,
    };
};

type IUpdateInviteData = {
    friendId: number;
    status: IUpdateInviteStatus;
};

const mutationFn = ({ friendId, status }: IUpdateInvite) =>
    axios.put<IUpdateInviteResponse>(`/api/invites/${friendId}`, { status });
