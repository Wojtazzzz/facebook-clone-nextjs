import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';

import { Avatar } from '@components/inc/Avatar';

import { toggleActive } from '@redux/slices/NotificationsListSlice';

import type { UserType } from '@ctypes/features/UserType';

interface NotificationProps {
    data: {
        type: string;
        initiator: UserType;
    };
    read_at: string | null;
}

export const Notification = ({ data, read_at }: NotificationProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRedirectToInvites = () => {
        dispatch(toggleActive());
        router.push('/friends/invites');
    };

    const { initiator } = data;

    return (
        <div
            title="Invitation for friendship"
            className="w-full h-[72px] flex gap-3 hover:bg-dark-100 transition-colors rounded-lg cursor-pointer p-2"
            onClick={handleRedirectToInvites}
        >
            <Avatar src={initiator.profile_image} size={56} alt={initiator.name} />

            <div className={`flex flex-col ${read_at ? 'opacity-50' : ''}`}>
                <span className="text-light-200 font-medium">{initiator.name}</span>

                <span className="text-sm text-light-100">
                    {data.type === 'FRIENDSHIP_INVITATION_SENDED' ? (
                        <>Send you a friendship invitation</>
                    ) : (
                        <>Accepted your friendship invitation</>
                    )}
                </span>
            </div>
        </div>
    );
};
