import { useAppDispatch } from '@hooks/redux';
import { useAxios } from '@hooks/useAxios';

import { Failure } from '@components/pages/friends/actions/responses/Failure';
import { Success } from '@components/pages/friends/actions/responses/Success';
import { Button } from '@components/inc/Button';

import { showChat } from '@redux/slices/ChatSlice';

import type { IUser } from '@utils/types';

interface FriendActionsProps {
    friend: IUser;
}

export const FriendActions = ({ friend }: FriendActionsProps) => {
    const dispatch = useAppDispatch();
    const { state, sendRequest } = useAxios();

    const handleOpenChat = (event: FocusEvent) => {
        event.preventDefault();
        dispatch(showChat(friend));
    };

    const handleRemove = (event: FocusEvent) => {
        event.preventDefault();
        sendRequest({ method: 'POST', url: '/api/friendship/destroy', data: { friend_id: friend.id } });
    };

    if (state.status === 'SUCCESS') return <Success message="Friendship destroyed" />;
    if (state.status === 'ERROR') return <Failure message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button
                title="Send message"
                styles="w-[140px]"
                isDisabled={state.status === 'LOADING'}
                callback={handleOpenChat}
            />

            <Button title="Remove" styles="w-[100px]" isDisabled={state.status === 'LOADING'} callback={handleRemove} />
        </div>
    );
};
