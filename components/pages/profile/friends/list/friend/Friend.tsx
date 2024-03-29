import type { IFriend } from '@utils/types';
import { Name } from './Name';
import { ProfileImage } from './ProfileImage';

interface FriendProps extends IFriend {}

export const Friend = ({ id, name, profile_image }: FriendProps) => {
    return (
        <article
            aria-label="Friend"
            className="w-[80%] md:w-[50%] max-w-[450px] md:max-w-none min-w-[300px] sm:min-w-[320px]"
        >
            <header className="flex items-center gap-3 m-1.5 py-2 md:py-4 px-3 md:px-5 border-dark-100/30 border-[1px] rounded-xl">
                <ProfileImage id={id} name={name} profileImage={profile_image} />
                <Name id={id} name={name} />
            </header>
        </article>
    );
};
