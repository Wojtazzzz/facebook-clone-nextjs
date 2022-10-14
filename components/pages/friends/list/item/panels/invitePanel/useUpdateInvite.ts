import { useMutation } from '@tanstack/react-query';
import type { IUpdateInvite } from '@utils/types';
import { axios } from '@utils/axios';

export const useUpdateInvite = () => {
    const mutation = useMutation(mutationFn);

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
