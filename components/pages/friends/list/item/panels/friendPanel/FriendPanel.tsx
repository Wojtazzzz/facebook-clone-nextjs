import { ErrorMessage } from '@components/pages/friends/list/item/panels/ErrorMessage';
import type { IUser } from '@utils/types';
import { useRemove } from './useRemove';
import { useChat } from '@hooks/useChat';
import { PanelButton } from '../PanelButton';

interface FriendPanelProps extends IUser {}

export const FriendPanel = (friend: FriendPanelProps) => {
    const { openChat } = useChat();
    const { remove, isError, isLoading } = useRemove();

    const handleOpenChat = (event: FocusEvent) => {
        event.preventDefault();
        openChat(friend);
    };

    const handleRemove = (event: FocusEvent) => {
        event.preventDefault();
        remove(friend.id);
    };

    if (isError) return <ErrorMessage message="Something went wrong, try again later" />;

    return (
        <div className="flex flex-col xs:flex-row gap-1.5 md:gap-3">
            <PanelButton title="Message" isDisabled={isLoading} callback={handleOpenChat} />
            <PanelButton title="Remove" isDisabled={isLoading} callback={handleRemove} />
        </div>
    );
};
