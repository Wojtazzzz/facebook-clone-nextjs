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
            <a data-testid="post-author" aria-label={`${first_name} profile`} className="flex gap-2 md:gap-3 pl-3">
                <Avatar src={profile_image} alt={`${name} profile image`} styles="w-[40px] h-[40px]" />

                <header className="flex flex-col gap-px">
                    <p className="text-sm text-light-50 font-medium hover:underline">{name}</p>

                    <small className="text-xs text-light-100">
                        {createdAt} {isEdited && '(Edited)'}
                    </small>
                </header>
            </a>
        </Link>
    );
};
