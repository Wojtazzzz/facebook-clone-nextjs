import type { IMessageIconType } from '@utils/types';
import { toPascalCase } from '@utils/toPascalCase';
import { Icon } from './Icon';

interface StatusIconProps {
    icon: IMessageIconType;
    readAt: string | undefined;
    friendAvatar: string;
}

export const StatusIcon = ({ icon, friendAvatar, readAt }: StatusIconProps) => {
    const title = toPascalCase(icon);

    return (
        <div
            data-testid="message-statusIcon"
            className="w-[20px] flex justify-center text-sm text-dark-100 mt-auto"
            title={title}
        >
            <Icon icon={icon} friendAvatar={friendAvatar} readAt={readAt} />
        </div>
    );
};
