import type { IChatMessage, IChatMessageStatus, IMessageIconType } from '@utils/types';
import { Content } from './content/Content';
import { FriendAvatar } from './FriendAvatar';
import { StatusIcon } from './StatusIcon';

interface MessageProps extends IChatMessage {
    senderAvatar: string;
    isLastRead: boolean;
}

export const Message = ({
    senderAvatar,
    isLastRead,
    content,
    images,
    is_received,
    status,
    read_at,
    created_at,
}: MessageProps) => {
    const ariaLabel = is_received ? 'Message received' : 'Message sent';
    const icon = getIcon(isLastRead, is_received, status);

    return (
        <article aria-label={ariaLabel} className="w-full flex justify-end items-end gap-0.5">
            {is_received && <FriendAvatar profileImage={senderAvatar} />}

            <Content content={content} images={images} createdAt={created_at} isReceived={is_received} />

            <div>
                <StatusIcon icon={icon} friendAvatar={senderAvatar} readAt={read_at} />
            </div>
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
