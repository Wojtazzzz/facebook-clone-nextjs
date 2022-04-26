import { useAxios } from '@hooks/useAxios';

import { Failure } from '@components/pages/friends/actions/responses/Failure';
import { Success } from '@components/pages/friends/actions/responses/Success';
import { Button } from '@components/inc/Button';

import type { UserType } from '@ctypes/features/UserType';

interface SuggestActionsProps {
    friend: UserType;
}

export const SuggestActions = ({ friend }: SuggestActionsProps) => {
    const { state, sendRequest } = useAxios();

    const handleInvite = (event: FocusEvent) => {
        event.preventDefault();
        sendRequest({ method: 'POST', url: '/api/friendship/invite', data: { user_id: friend.id } });
    };

    if (state.status === 'SUCCESS') return <Success message="Request sent successfully" />;
    if (state.status === 'ERROR') return <Failure message="Something went wrong, try again later" />;

    return (
        <Button
            title="Invite"
            styles="w-[150px]"
            isDisabled={state.status === 'LOADING'}
            callback={(event) => handleInvite(event)}
        />
    );
};
