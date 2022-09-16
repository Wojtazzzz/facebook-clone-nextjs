import { Hero } from '@components/pages/profile/hero/Hero';
import { Intro } from '@components/pages/profile/intro/Intro';
import { Board } from '@components/pages/profile/board/Board';
import type { IUserProfile, IProfileFriendsData } from '@utils/types';

interface ProfileProps {
    user: IUserProfile;
    friends: IProfileFriendsData;
}

export const Profile = ({ user, friends }: ProfileProps) => {
    const { id, name, profile_image, born_at } = user;

    return (
        <div className="w-full flex flex-col gap-5">
            <Hero user={user} friends={friends} />

            <div className="w-full flex gap-4 px-1">
                <Intro {...user} />
                <Board user={user} />
            </div>
        </div>
    );
};
