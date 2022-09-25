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
            className="w-full min-w-[280px] max-w-[350px] xl:max-w-[400px] flex flex-col gap-3"
        >
            <Intro {...user} />
            <Friends {...user} />
        </aside>
    );
};
