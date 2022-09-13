/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar } from '@components/inc/Avatar';
import Link from 'next/link';

interface AuthorProps {
    id: number;
    profileImage: string;
}

export const Author = ({ id, profileImage }: AuthorProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a>
                <Avatar src={profileImage} size={36} alt="" />
            </a>
        </Link>
    );
};
