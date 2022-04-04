import { useAppDispatch } from '@hooks/redux';
import { useAxios } from '@hooks/useAxios';

import { Failure } from 'components/pages/friends/actions/messages/Failure';
import { Success } from '@components/pages/friends/actions/messages/Success';
import { Button } from '@components/Button';

import { toggleActive } from '@redux/slices/ChatSlice';
import { StateStatus } from '@enums/StateStatus';

import type { UserType } from '@ctypes/features/UserType';

interface FriendActionsProps {
    friend: UserType;
}

export const FriendActions = ({ friend }: FriendActionsProps) => {
    const dispatch = useAppDispatch();
    const { state, sendRequest } = useAxios();

    const handleOpenChat = (event: FocusEvent) => {
        event.preventDefault();
        dispatch(toggleActive(friend));
    };

    const handleRemove = (event: FocusEvent) => {
        event.preventDefault();
        sendRequest({ method: 'POST', url: '/api/friendship/destroy', data: { user_id: friend.id } });
    };

    if (state.status === StateStatus.SUCCESS) return <Success message={state.data.message} />;
    if (state.status === StateStatus.ERROR) return <Failure message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button
                title="Send message"
                styles="w-[140px]"
                isDisabled={state.status === StateStatus.LOADING}
                callback={handleOpenChat}
            />

            <Button
                title="Remove"
                styles="w-[100px]"
                isDisabled={state.status === StateStatus.LOADING}
                callback={handleRemove}
            />
        </div>
    );
};
