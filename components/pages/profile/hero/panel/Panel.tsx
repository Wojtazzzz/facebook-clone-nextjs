import { useAuth } from '@hooks/useAuth';

import { AuthPanel } from '@components/pages/profile/hero/panel/AuthPanel';
import { GuestPanel } from '@components/pages/profile/hero/panel/GuestPanel';

import type { UserType } from '@ctypes/features/UserType';

interface PanelProps {
    pageUser: UserType;
}

export const Panel = ({ pageUser }: PanelProps) => {
    const { user } = useAuth();

    if (user && user.id === pageUser.id) {
        return <AuthPanel />;
    }

    return <GuestPanel user={pageUser} />;
};
