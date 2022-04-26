import { SendImage } from '@components/chat/options/SendImage';
import { SendMessage } from '@components/chat/options/SendMessage';

export const Panel = () => {
    return (
        <div data-testid="chat-panel" className="w-full flex justify-between items-center text-light-100 p-2">
            <SendImage />
            <SendMessage />
        </div>
    );
};
