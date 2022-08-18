import { ErrorMessage } from './ErrorMessage';
import { Messages } from './messages/Messages';

interface ConversationProps {
    friendId: number;
}

export const Conversation = ({ friendId }: ConversationProps) => {
    return (
        <div className="w-full h-full max-h-[312px] relative">
            <ErrorMessage />
            <Messages friendId={friendId} />
        </div>
    );
};
