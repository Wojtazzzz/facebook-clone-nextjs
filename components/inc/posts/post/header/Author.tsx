/* eslint-disable jsx-a11y/anchor-is-valid */
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
            <a aria-label={`${first_name} profile`} className="flex gap-2 md:gap-3 pr-2 md:pr-3">
                <Avatar src={profile_image} alt={`${name} profile image`} styles="w-[40px] h-[40px]" />

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
