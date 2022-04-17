import { useState } from 'react';
import { useAxios } from '@hooks/useAxios';

import { Failure } from '@components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import type { UserType } from '@ctypes/features/UserType';

interface InviteActionsProps {
    friend: UserType;
}

export const InviteActions = ({ friend }: InviteActionsProps) => {
    const { state, sendRequest } = useAxios();
    const [action, setAction] = useState<'REJECT' | 'ACCEPT'>();

    const handleAccept = (event: FocusEvent) => {
        event.preventDefault();

        sendRequest({ method: 'POST', url: '/api/friendship/accept', data: { user_id: friend.id } });
        setAction('ACCEPT');
    };

    const handleReject = (event: FocusEvent) => {
        event.preventDefault();

        sendRequest({ method: 'POST', url: '/api/friendship/reject', data: { user_id: friend.id } });
        setAction('REJECT');
    };

    if (state.status === 'SUCCESS') {
        const message = action === 'REJECT' ? 'Request rejected successfully' : 'Request accepted successfully';
        return <Success message={message} />;
    }

    if (state.status === 'ERROR') return <Failure message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button title="Reject" styles="w-[100px]" isDisabled={state.status === 'LOADING'} callback={handleReject} />
            <Button title="Accept" styles="w-[100px]" isDisabled={state.status === 'LOADING'} callback={handleAccept} />
        </div>
    );
};
