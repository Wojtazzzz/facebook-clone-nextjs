import { Hero } from '@components/pages/profile/hero/Hero';
import { Intro } from '@components/pages/profile/intro/Intro';

import type { IUser, IUserProfile } from '@utils/types';

interface ProfileProps {
    user: IUserProfile;
    friends: {
        amount: number;
        list: IUser[];
    };
}

export const Profile = ({ user, friends }: ProfileProps) => {
    return (
        <div className="w-full flex flex-col gap-5">
            <Hero user={user} friends={friends} />

            <div className="w-full">
                <Intro {...user} />
            </div>
        </div>
    );
};
