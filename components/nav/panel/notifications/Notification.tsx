import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';

import { SingleItem } from '@components/nav/panel/inc/SingleItem';

import { toggleActive } from '@redux/slices/NotificationsSlice';

import type { NotificationType } from '@ctypes/features/NotificationType';

interface NotificationProps extends NotificationType {}

export const Notification = ({ message, friend, link, read_at }: NotificationProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRedirect = () => {
        dispatch(toggleActive(false));
        router.push(link);
    };

    return (
        <SingleItem
            ariaLabel="Redirect to invites list"
            title={friend.name}
            description={message}
            image={friend.profile_image}
            isActive={!!!read_at}
            callback={handleRedirect}
        />
    );
};
