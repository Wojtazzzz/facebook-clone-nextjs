import { useAppDispatch } from '@hooks/redux';

import { Failure } from '@components/pages/friends/item/actions/responses/Failure';
import { Success } from '@components/pages/friends/item/actions/responses/Success';
import { Button } from '@components/inc/Button';

import { openChat } from '@redux/slices/ChatSlice';

import type { IUser } from '@utils/types';
import { useFriendship } from '@hooks/useFriendship';

interface FriendActionsProps extends IUser {}

export const FriendActions = (friend: FriendActionsProps) => {
    const dispatch = useAppDispatch();
    const { useRemove } = useFriendship();
    const { remove, isSuccess, isError, isLoading } = useRemove();

    const handleOpenChat = (event: FocusEvent) => {
        event.preventDefault();
        dispatch(openChat(friend));
    };

    const handleRemove = (event: FocusEvent) => {
        event.preventDefault();
        remove(friend.id);
    };

    if (isSuccess) return <Success message="Friendship destroyed" />;
    if (isError) return <Failure message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button title="Send message" styles="w-[140px]" isDisabled={isLoading} callback={handleOpenChat} />

            <Button title="Remove" styles="w-[100px]" isDisabled={isLoading} callback={handleRemove} />
        </div>
    );
};
