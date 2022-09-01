import { useChat } from '@hooks/useChat';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const CloseChat = () => {
    const { closeChat } = useChat();

    return (
        <RoundedButton
            name="Close chat"
            icon={faTimes}
            size={8}
            bgColor="dark-200"
            onHover="bg-dark-100"
            callback={closeChat}
        />
    );
};
