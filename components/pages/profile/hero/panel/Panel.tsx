import { useAuth } from '@hooks/useAuth';

import { AuthPanel } from '@components/pages/profile/hero/panel/AuthPanel';
import { GuestPanel } from '@components/pages/profile/hero/panel/GuestPanel';

import type { IUser } from '@utils/types';

interface PanelProps {
    pageUser: IUser;
}

export const Panel = ({ pageUser }: PanelProps) => {
    const { user } = useAuth();

    if (user?.id === pageUser.id) {
        return <AuthPanel />;
    }

    return <GuestPanel user={pageUser} />;
};
