import { faImage } from '@fortawesome/free-solid-svg-icons';
import { SendMessage } from '@components/chat/SendMessage';
import { RoundedButton } from '@components/RoundedButton';

interface PanelProps {
    friendId: number;
}

export const Panel = ({ friendId }: PanelProps) => {
    const handleSendImage = () => alert('Maybe in the future...');

    return (
        <div data-testid="chat-panel" className="w-full flex justify-between items-center text-light-100 p-2">
            <RoundedButton
                name="Close chat"
                icon={faImage}
                size={8}
                bgColor="dark-200"
                onHover="bg-dark-100"
                callback={handleSendImage}
            />

            <SendMessage friendId={friendId} />
        </div>
    );
};
