import { useAuth } from '@hooks/useAuth';
import { AuthControls } from './authControls/AuthControls';
import { GuestControls } from './guestControls/GuestControls';
import type { IUserProfile } from '@utils/types';
import { Loader } from './Loader';

interface ControlsProps {
    pageUser: IUserProfile;
}

export const Controls = ({ pageUser }: ControlsProps) => {
    const { user } = useAuth();

    if (!user) return <Loader />;
    if (user.id === pageUser.id) return <AuthControls />;

    return <GuestControls user={pageUser} />;
};
