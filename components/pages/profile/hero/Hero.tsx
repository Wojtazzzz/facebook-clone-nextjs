import { memo } from 'react';

import { Background } from '@components/pages/profile/hero/Background';
import { User } from '@components/pages/profile/hero/user/User';
import { Panel } from '@components/pages/profile/hero/panel/Panel';

import type { IProfileFriendsData, IUser } from '@utils/types';

interface HeroProps {
    user: IUser;
    friends: IProfileFriendsData;
}

export const Hero = memo<HeroProps>(({ user, friends }) => {
    const { id, first_name, name, profile_image, background_image } = user;

    return (
        <div className="w-full border-b-2 border-dark-100">
            <Background first_name={first_name} background_image={background_image} />

            <div className="w-full flex flex-col md:flex-row justfy-between -translate-y-10 px-3 xs:px-5 sm:px-8 md:px-10 lg:px-12">
                <User id={id} first_name={first_name} name={name} profile_image={profile_image} friends={friends} />
                <Panel pageUser={user} />
            </div>
        </div>
    );
});

Hero.displayName = 'Hero';
