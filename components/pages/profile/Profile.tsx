import { Hero } from '@components/pages/profile/hero/Hero';
import { Board } from '@components/pages/profile/board/Board';
import type { IUserProfile, IProfileFriendsData } from '@utils/types';
import { AsideInfo } from './asideInfo/AsideInfo';

interface ProfileProps {
    user: IUserProfile;
    friends: IProfileFriendsData;
}

export const Profile = ({ user, friends }: ProfileProps) => {
    return (
        <div className="w-full max-w-[1200px] flex flex-col gap-5 mx-auto lg:pl-[250px] xl:pl-[300px] box-content">
            <Hero user={user} friends={friends} />

            <div className="w-full flex flex-wrap lg:flex-nowrap justify-center gap-3 p-2">
                <AsideInfo user={user} />
                <Board user={user} />
            </div>
        </div>
    );
};
