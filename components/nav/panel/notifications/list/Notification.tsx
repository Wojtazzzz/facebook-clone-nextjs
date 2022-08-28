import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';
import { toggleActive } from '@redux/slices/NotificationsSlice';
import type { INotification } from '@utils/types';
import { Avatar } from '@components/inc/Avatar';
import clsx from 'clsx';

interface NotificationProps extends INotification {}

export const Notification = ({ message, friend, read_at, link }: NotificationProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRedirect = () => {
        dispatch(toggleActive(false));
        router.push(link);
    };

    return (
        <button
            className={clsx(
                'w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2',
                read_at && 'opacity-60'
            )}
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
