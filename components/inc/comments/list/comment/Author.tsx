/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar } from '@components/inc/Avatar';
import Link from 'next/link';

interface AuthorProps {
    id: number;
    name: string;
    profileImage: string;
}

export const Author = ({ id, name, profileImage }: AuthorProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a aria-label={name}>
                <Avatar src={profileImage} alt="" styles="w-[36px] h-[36px]" />
            </a>
        </Link>
    );
};
