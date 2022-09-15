import { useAppDispatch } from '@hooks/redux';
import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import { Button } from '@components/inc/Button';
import { openChat } from '@redux/slices/ChatSlice';
import type { IUser } from '@utils/types';
import { useRemove } from './useRemove';

interface FriendPanelProps extends IUser {}

export const FriendPanel = (friend: FriendPanelProps) => {
    const dispatch = useAppDispatch();
    const { remove, isError, isLoading } = useRemove();

    const handleOpenChat = (event: FocusEvent) => {
        event.preventDefault();
        dispatch(openChat(friend));
    };

    const handleRemove = (event: FocusEvent) => {
        event.preventDefault();
        remove(friend.id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return (
        <div className="flex gap-3">
            <Button title="Send message" styles="w-[140px]" isDisabled={isLoading} callback={handleOpenChat} />
            <Button title="Remove" styles="w-[100px]" isDisabled={isLoading} callback={handleRemove} />
        </div>
    );
};
