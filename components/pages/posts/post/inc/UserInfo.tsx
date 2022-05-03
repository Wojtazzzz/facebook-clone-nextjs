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
        <Link href={`/profile/${author.id}`}>
            <a aria-label={`${author.first_name} profile`} className="flex gap-3">
                <Avatar size={40} src={author.profile_image} alt={`${author.name} profile image`} />

                <div className="flex flex-col gap-px">
                    <span className="text-sm text-light-50 font-medium">{author.name}</span>

                    <span className="text-xs text-light-100">
                        {updated_at} {created_at !== updated_at && '(Edited)'}
                    </span>
                </div>
            </a>
        </Link>
    );
};
