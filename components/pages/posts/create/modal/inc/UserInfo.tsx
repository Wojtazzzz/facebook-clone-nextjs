import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';

import type { UserType } from '@ctypes/features/UserType';

interface UserInfoProps {
    user: UserType;
}

export const UserInfo = ({ user }: UserInfoProps) => {
    return (
        <Link href={`/profile/${user.id}`}>
            <a title={`${user.name} profile`} className="flex gap-3 mb-1">
                <Avatar src={`${user.profile_image}`} size="40" alt={`${user.first_name} profile image`} />

                <span className="text-sm text-light-100 font-bold mt-1">{user.name}</span>
            </a>
        </Link>
    );
};
