import type { IUserProfile } from '@utils/types';
import { AsideInfo } from './asideInfo/AsideInfo';
import { Board } from './board/Board';

interface ProfileProps {
    user: IUserProfile;
}

export const Profile = ({ user }: ProfileProps) => {
    return (
        <div className="w-full flex flex-wrap lg:flex-nowrap justify-center gap-3 p-2">
            <AsideInfo user={user} />
            <Board user={user} />
        </div>
    );
};
