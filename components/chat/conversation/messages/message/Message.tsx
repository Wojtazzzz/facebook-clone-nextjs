import type { IChatMessage, IChatMessageStatus, IMessageIconType } from '@utils/types';
import { FriendAvatar } from './FriendAvatar';
import { StatusIcon } from './StatusIcon';
import { Text } from './Text';

interface MessageProps extends IChatMessage {
    senderAvatar: string;
    isLastRead: boolean;
}

export const Message = ({ senderAvatar, isLastRead, text, is_received, status, read_at, created_at }: MessageProps) => {
    const ariaLabel = is_received ? 'Message received' : 'Message sent';
    const icon = getIcon(isLastRead, is_received, status);

    return (
        <article aria-label={ariaLabel} className="w-full flex items-end">
            {is_received && <FriendAvatar profileImage={senderAvatar} />}

            <Text text={text} createdAt={created_at} isReceived={is_received} />

            <StatusIcon icon={icon} friendAvatar={senderAvatar} readAt={read_at} />
        </article>
    );
};

const getIcon = (isLastRead: boolean, isReceived: boolean, status: IChatMessageStatus): IMessageIconType => {
    if (isLastRead) {
        return 'AVATAR';
    }

    if (status !== 'READ' && !isReceived) {
        return status;
    }
};
