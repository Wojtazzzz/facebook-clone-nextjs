import { useChat } from '@hooks/useChat';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../inc/Button';

export const CloseChat = () => {
    const { closeChat } = useChat();

    return <Button type="button" label="Close chat" icon={faTimes} callback={closeChat} />;
};
