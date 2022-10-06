import type { IChatFriend } from '@utils/types';
import { ErrorMessage } from './ErrorMessage';
import { Messages } from './messages/Messages';

interface ConversationProps {
    friend: IChatFriend;
}

export const Conversation = ({ friend }: ConversationProps) => {
    return (
        <section aria-label="Conversation" className="w-full h-full max-h-[312px] relative">
            <ErrorMessage />
            <Messages friend={friend} />
        </section>
    );
};
