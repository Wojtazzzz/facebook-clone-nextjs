import type { IUserProfile } from '@utils/types';
import { Friends } from './friends/Friends';
import { Intro } from './intro/Intro';

interface AsideInfoProps {
    user: IUserProfile;
}

export const AsideInfo = ({ user }: AsideInfoProps) => {
    return (
        <aside
            data-testid="profile-asideInfo"
            className="w-full min-w-[300px] max-w-[380px] xl:max-w-[420px] flex flex-col gap-3"
        >
            <Intro {...user} />
            <Friends userId={user.id} />
        </aside>
    );
};
