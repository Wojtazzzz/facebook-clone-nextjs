import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { IUpdateInvite, IUpdateInviteStatus } from '@utils/types';
import { axios } from '@libs/axios';

type IUpdateInviteResponse = {
    message: string;
};

export const useUpdateInvite = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation(mutationFn);

    const updateInvite = (data: IUpdateInviteData) => {
        if (mutation.isLoading) return;

        mutation.mutate(data, {
            onSuccess: () => queryClient.invalidateQueries(['Invites']),
        });
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
