import { Board } from '@components/pages/profile/board/Board';
import type { IUserProfile, IProfileFriendsData } from '@utils/types';
import { AsideInfo } from './asideInfo/AsideInfo';

interface ProfileProps {
    user: IUserProfile;
    friends: IProfileFriendsData;
}

export const Profile = ({ user, friends }: ProfileProps) => {
    return (
        <div className="w-full flex flex-wrap lg:flex-nowrap justify-center gap-3 p-2">
            <AsideInfo user={user} />
            <Board user={user} />
        </div>
    );
};
