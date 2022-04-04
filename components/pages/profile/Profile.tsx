import { Header } from '@components/pages/profile/Header';

import type { UserType } from '@ctypes/features/UserType';

interface ProfileProps {
    user: UserType;
}

export const Profile = ({ user }: ProfileProps) => {
    return (
        <div className="w-full">
            <Header user={user} />
        </div>
    );
};
