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

    return (
        <div className="w-full flex justify-end items-end gap-3 mt-5 md:mt-0 px-4 md:px-8 lg:px-12">
            {user.id === pageUser.id ? <AuthControls /> : <GuestControls user={pageUser} />}
        </div>
    );
};
