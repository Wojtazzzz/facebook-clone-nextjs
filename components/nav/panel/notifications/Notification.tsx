import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';

import { SingleItem } from '@components/nav/panel/inc/SingleItem';

import { toggleActive } from '@redux/slices/NotificationsSlice';

import type { INotification } from '@utils/types';

interface NotificationProps extends INotification {}

export const Notification = ({ message, friend, link, read_at }: NotificationProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRedirect = () => {
        dispatch(toggleActive(false));
        router.push(link);
    };

    return (
        <SingleItem
            title={friend.name}
            message={message}
            image={friend.profile_image}
            isActive={!!!read_at}
            callback={handleRedirect}
        />
    );
};
