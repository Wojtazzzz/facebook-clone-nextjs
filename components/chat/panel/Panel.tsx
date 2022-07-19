import { SendImage } from '@components/chat/panel/sendImage/SendImage';
import { SendMessage } from '@components/chat/panel/sendMessage/SendMessage';

export const Panel = () => {
    return (
        <div data-testid="chat-panel" className="w-full flex justify-between items-center text-light-100 p-2">
            <SendImage />
            <SendMessage />
        </div>
    );
};
