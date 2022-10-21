import { memo } from 'react';
import type { IUserProfile } from '@utils/types';
import { Background } from './Background';
import { User } from './user/User';
import { Controls } from './controls/Controls';

interface HeroProps {
    user: IUserProfile;
}

export const Hero = memo<HeroProps>(({ user }) => {
    const { id, first_name, name, profile_image, background_image } = user;

    return (
        <header className="w-full border-b-2 border-dark-100">
            <Background firstName={first_name} backgroundImage={background_image} />

            <div className="w-full flex flex-col md:flex-row -translate-y-5 md:-translate-y-10 px-3 xs:px-5 sm:px-8 md:px-10 lg:px-12">
                <User id={id} firstName={first_name} name={name} profileImage={profile_image} />
                <Controls pageUser={user} />
            </div>
        </header>
    );
});

Hero.displayName = 'Hero';
