import { Avatar } from '@components/inc/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IMessageIconType } from '@utils/types';
import { faCircleCheck as faCircleCheckRegular } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck as faCircleCheckSolid } from '@fortawesome/free-solid-svg-icons';
import { toPascalCase } from '@utils/toPascalCase';

interface StatusIconProps {
    icon: IMessageIconType;
    readAt: string | undefined;
    friendAvatar: string;
}

export const StatusIcon = ({ icon, friendAvatar, readAt }: StatusIconProps) => {
    if (icon === 'AVATAR') {
        return <Avatar size={14} src={friendAvatar} alt="" title={`Seen at ${readAt}`} styles="w-[20px]" />;
    }

    if (!icon) {
        return <div data-testid="statusIcon-empty" className="w-[20px]"></div>;
    }

    const faIcon = icon === 'DELIVERED' ? faCircleCheckSolid : faCircleCheckRegular;

    return (
        <div className="w-[20px] flex justify-center text-sm text-dark-100">
            <FontAwesomeIcon icon={faIcon} title={toPascalCase(icon)} />
        </div>
    );
};
