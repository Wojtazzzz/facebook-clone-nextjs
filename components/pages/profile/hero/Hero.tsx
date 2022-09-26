import { memo } from 'react';
import { Background } from '@components/pages/profile/hero/Background';
import { User } from '@components/pages/profile/hero/user/User';
import { Controls } from '@components/pages/profile/hero/controls/Controls';
import type { IUser } from '@utils/types';

interface HeroProps {
    user: IUser;
}

export const Hero = memo<HeroProps>(({ user }) => {
    const { id, first_name, name, profile_image, background_image } = user;

    return (
        <div className="w-full border-b-2 border-dark-100">
            <Background firstName={first_name} backgroundImage={background_image} />

            <div className="w-full flex flex-col md:flex-row -translate-y-5 md:-translate-y-10 px-3 xs:px-5 sm:px-8 md:px-10 lg:px-12">
                <User id={id} firstName={first_name} name={name} profileImage={profile_image} />

                <div className="w-full flex justify-end items-end gap-4 mt-5 md:mt-0 px-4 md:px-8 lg:px-12">
                    <Controls pageUser={user} />
                </div>
            </div>
        </div>
    );
});

Hero.displayName = 'Hero';
