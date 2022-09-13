/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

interface FriendProps {
    id: number;
    name: string;
    profile_image: string;
}

export const Friend = ({ id, name, profile_image }: FriendProps) => {
    return (
        <li className="-mx-0.5">
            <Link href={`/profile/${id}`}>
                <a>
                    <Image width="32" height="32" src={profile_image} alt="" title={name} className="rounded-full" />
                </a>
            </Link>
        </li>
    );
};
