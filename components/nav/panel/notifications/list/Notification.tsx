import { useRouter } from 'next/router';
import type { INotification } from '@utils/types';
import { Avatar } from '@components/inc/Avatar';
import clsx from 'clsx';

interface NotificationProps extends INotification {
    close: () => void;
}

export const Notification = ({ message, friend, read_at, link, close }: NotificationProps) => {
    const router = useRouter();

    const handleRedirect = () => {
        close();
        router.push(link);
    };

    const { profile_image, name } = friend;

    return (
        <button
            className={clsx(
                'w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-1 md:p-2',
                read_at && 'opacity-80'
            )}
            onClick={handleRedirect}
        >
            <div>
                <Avatar src={profile_image} alt="" styles="w-[56px] h-[56px]" />
            </div>

            <div className="flex flex-col text-left">
                <span className="text-light-200">{name}</span>
                <span className="text-sm text-light-100">{message}</span>
            </div>
        </button>
    );
};
