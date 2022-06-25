import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';

import type { UserType } from '@ctypes/features/UserType';

interface UserInfoProps {
    user: UserType;
}

export const UserInfo = ({ user }: UserInfoProps) => {
    const { id, name, first_name, profile_image } = user;

    return (
        <Link href={`/profile/${id}`}>
            <a title={`${name} profile`} className="flex gap-3 mb-1">
                <Avatar src={profile_image} size="40" alt={`${first_name} profile image`} />

                <span className="text-sm text-light-100 font-bold mt-1">{name}</span>
            </a>
        </Link>
    );
};
