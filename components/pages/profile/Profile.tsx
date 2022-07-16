import { Hero } from '@components/pages/profile/hero/Hero';

import type { UserType } from '@ctypes/features/UserType';

interface ProfileProps {
    user: UserType;
    friends: {
        amount: number;
        list: UserType[];
    };
}

export const Profile = ({ user, friends }: ProfileProps) => {
    return (
        <div className="w-full">
            <Hero user={user} friends={friends} />
        </div>
    );
};
