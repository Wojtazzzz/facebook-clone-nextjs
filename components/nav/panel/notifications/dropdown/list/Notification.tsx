import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';

import { toggleActive } from '@redux/slices/NotificationsSlice';

import type { INotification } from '@utils/types';
import { Avatar } from '@components/inc/Avatar';

interface NotificationProps extends INotification {}

export const Notification = ({ message, friend, link }: NotificationProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRedirect = () => {
        dispatch(toggleActive(false));
        router.push(link);
    };

    return (
        <button
            className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
            onClick={handleRedirect}
        >
            <Avatar src={friend.profile_image} size={56} alt="" />

            <div className="flex flex-col text-left">
                <span className="text-light-200">{friend.name}</span>
                <span className="text-sm text-light-100">{message}</span>
            </div>
        </button>
    );
};
