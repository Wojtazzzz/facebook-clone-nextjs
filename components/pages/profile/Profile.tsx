import { Hero } from '@components/pages/profile/hero/Hero';

import type { IUser } from '@utils/types';

interface ProfileProps {
    user: IUser;
    friends: {
        amount: number;
        list: IUser[];
    };
}

export const Profile = ({ user, friends }: ProfileProps) => {
    return (
        <div className="w-full">
            <Hero user={user} friends={friends} />
        </div>
    );
};
