import { Hero } from '@components/pages/profile/hero/Hero';
import { Intro } from '@components/pages/profile/intro/Intro';
import { Board } from '@components/pages/profile/board/Board';
import type { IUserProfile, IProfileFriendsData } from '@utils/types';

interface ProfileProps {
    user: IUserProfile;
    friends: IProfileFriendsData;
}

export const Profile = ({ user, friends }: ProfileProps) => {
    return (
<<<<<<< HEAD
        <div className="w-full max-w-[1200px] flex flex-col gap-5 mx-auto lg:pl-[250px] xl:pl-[300px] box-content">
=======
        <div className="w-full max-w-[1200px] flex flex-col gap-5 mx-auto pl-[250px] xl:pl-[300px] box-content">
>>>>>>> cdcf724f534c6ae324e08953970f2e80b11f7e62
            <Hero user={user} friends={friends} />

            <div className="w-full flex flex-wrap lg:flex-nowrap justify-center gap-4 p-2">
                <Intro {...user} />
                <Board user={user} />
            </div>
        </div>
    );
};
