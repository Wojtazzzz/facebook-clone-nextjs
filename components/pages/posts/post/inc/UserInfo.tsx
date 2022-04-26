import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';

import type { UserType } from '@ctypes/features/UserType';

interface UserInfoProps {
    author: UserType;
    created_at: string;
    updated_at: string;
}

export const UserInfo = ({ author, created_at, updated_at }: UserInfoProps) => {
    return (
        <div className="flex gap-3">
            <Link href={`/profile/${author.id}`}>
                <a className="text-sm text-light-50 font-medium">
                    <Avatar size={40} src={author.profile_image} alt={`${author.name} profile image`} />
                </a>
            </Link>

            <div className="flex flex-col gap-px">
                <Link href={`/profile/${author.id}`}>
                    <a className="text-sm text-light-50 font-medium">{author.name}</a>
                </Link>

                <span className="text-xs text-light-100">
                    {updated_at} {created_at !== updated_at && '(Edited)'}
                </span>
            </div>
        </div>
    );
};
