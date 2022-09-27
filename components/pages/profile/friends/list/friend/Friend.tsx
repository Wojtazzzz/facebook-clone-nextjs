/* eslint-disable jsx-a11y/anchor-is-valid */
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
            <div className="flex items-center gap-3 m-1.5 py-2 md:py-4 px-3 md:px-5 border-dark-100 border-[1px] border-opacity-30 rounded-xl">
                <ProfileImage id={id} profileImage={profile_image} />
                <Name id={id} name={name} />
            </div>
        </article>
    );
};
