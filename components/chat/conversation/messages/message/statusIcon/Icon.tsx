import { Avatar } from '@components/inc/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IMessageIconType } from '@utils/types';
import { faCircleCheck as faCircleCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck as faCircleCheckSolid } from '@fortawesome/free-solid-svg-icons';

interface IconProps {
    icon: IMessageIconType;
    friendAvatar: string;
    readAt: string | undefined;
}

export const Icon = ({ icon, friendAvatar, readAt }: IconProps) => {
    if (!icon) {
        return <div data-testid="statusIcon-empty"></div>;
    }

    if (icon === 'AVATAR') {
        return <Avatar src={friendAvatar} alt="" title={`Seen at ${readAt}`} styles="w-[14px] h-[14px]" />;
    }

    const faIcon = icon === 'DELIVERED' ? faCircleCheckSolid : faCircleCheckRegular;

    return <FontAwesomeIcon icon={faIcon} />;
};
