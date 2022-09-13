import { useChat } from '@hooks/useChat';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

export const CloseChat = () => {
    const { closeChat } = useChat();

    return <RoundedButton label="Close chat" icon={faTimes} callback={closeChat} />;
};
