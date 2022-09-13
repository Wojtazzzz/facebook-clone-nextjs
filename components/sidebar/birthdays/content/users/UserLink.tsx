/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

interface UserLinkProps {
    id: number;
    name: string;
}

export const UserLink = ({ id, name }: UserLinkProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="font-semibold hover:underline">{name}</a>
        </Link>
    );
};
