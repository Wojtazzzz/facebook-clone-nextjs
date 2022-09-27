/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';

interface NameProps {
    id: number;
    name: string;
}

export const Name = ({ id, name }: NameProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="text-sm md:text-base text-light-50 font-medium hover:underline">{name}</a>
        </Link>
    );
};
