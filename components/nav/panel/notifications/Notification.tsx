import { useRouter } from 'next/router';
import { useAppDispatch } from '@hooks/redux';

import { SingleItem } from '@components/nav/panel/inc/SingleItem';

import { toggleActive } from '@redux/slices/NotificationsListSlice';
import { notificationsMessages } from '@constants/notificationsMessages';

import type { UserType } from '@ctypes/features/UserType';

interface NotificationProps {
    data: {
        type: 'FRIENDSHIP_INVITATION_SENDED' | 'FRIENDSHIP_INVITATION_ACCEPTED';
        initiator: UserType;
    };
    read_at: string | null;
}

export const Notification = ({ data, read_at }: NotificationProps) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleRedirectToInvites = () => {
        dispatch(toggleActive(false));
        router.push('/friends/invites');
    };

    const { initiator } = data;

    return (
        <SingleItem
            ariaLabel="Redirect to invites list"
            title={initiator.name}
            description={notificationsMessages[data.type]}
            image={initiator.profile_image}
            isActive={!!read_at}
            callback={handleRedirectToInvites}
        />
    );
};
