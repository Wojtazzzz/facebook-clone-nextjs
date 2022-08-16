import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { IUpdateInvite, IUpdateInviteStatus } from '@utils/types';
import { axios } from '@libs/axios';

type IUpdateInviteResponse = {
    message: string;
};

export const useFriendship = () => {
    const queryClient = useQueryClient();

    const inviteMutation = useMutation((friendId: number) => axios.post('/api/invites', { friend_id: friendId }));
    const updateInviteMutation = useMutation(({ friendId, status }: IUpdateInvite) =>
        axios.put<IUpdateInviteResponse>(`/api/invites/${friendId}`, { status })
    );
    const removeMutation = useMutation((friendId: number) => axios.delete(`/api/friends/${friendId}`));

    const invite = (friendId: number) => {
        if (inviteMutation.isLoading) return;

        inviteMutation.mutate(friendId, {
            onSuccess: () => queryClient.invalidateQueries(['Suggests']),
        });
    };

    const updateInvite = (friendId: number, status: IUpdateInviteStatus) => {
        if (updateInviteMutation.isLoading) return;

        updateInviteMutation.mutate(
            { friendId, status },
            {
                onSuccess: () => queryClient.invalidateQueries(['Invites']),
            }
        );
    };

    const remove = (friendId: number) => {
        if (removeMutation.isLoading) return;

        removeMutation.mutate(friendId, {
            onSuccess: () => queryClient.invalidateQueries(['Friends']),
        });
    };

    return {
        useInvite: () => ({
            invite,
            ...inviteMutation,
        }),

        useUpdateInvite: () => ({
            updateInvite,
            ...updateInviteMutation,
        }),

        useRemove: () => ({
            remove,
            ...removeMutation,
        }),
    };
};
