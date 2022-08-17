import Link from 'next/link';
import { Avatar } from '@components/inc/Avatar';

import type { IUser } from '@utils/types';

interface AuthorProps {
    author: IUser;
    createdAt: string;
    isEdited: boolean;
}

export const Author = ({ author, createdAt, isEdited }: AuthorProps) => {
    const { id, first_name, name, profile_image } = author;

    return (
        <Link href={`/profile/${id}`}>
            <a aria-label={`${first_name} profile`} className="flex gap-3">
                <Avatar size={40} src={profile_image} alt={`${name} profile image`} />

                <div className="flex flex-col gap-px">
                    <span className="text-sm text-light-50 font-medium">{name}</span>

                    <span className="text-xs text-light-100">
                        {createdAt} {isEdited && '(Edited)'}
                    </span>
                </div>
            </a>
        </Link>
    );
};
