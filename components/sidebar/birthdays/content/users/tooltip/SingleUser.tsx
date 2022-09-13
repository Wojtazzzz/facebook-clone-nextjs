/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

interface SingleUserProps {
    id: number;
    name: string;
}

export const SingleUser = ({ id, name }: SingleUserProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="text-sm font-medium text-light-100">{name}</a>
        </Link>
    );
};
