import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IUser } from '@utils/types';
import { useRemoveFriend } from './useRemoveFriend';
import { useChat } from '@hooks/useChat';
import { PanelButton } from '../PanelButton';
import { SuccessMessage } from '../SuccessMessage';

interface FriendPanelProps extends IUser {}

export const FriendPanel = (friend: FriendPanelProps) => {
    const { openChat } = useChat();
    const { remove, isError, isSuccess, isLoading } = useRemoveFriend();

    const handleOpenChat = () => {
        openChat(friend);
    };

    const handleRemove = () => {
        remove(friend.id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;
    if (isSuccess) return <SuccessMessage message="User successfully removed" />;

    return (
        <div className="flex flex-col xs:flex-row gap-1.5 md:gap-3">
            <PanelButton title="Message" isLoading={isLoading} callback={handleOpenChat} />
            <PanelButton title="Remove" isLoading={isLoading} callback={handleRemove} />
        </div>
    );
};
