/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/future/image';
import Link from 'next/link';

interface FriendProps {
    id: number;
    name: string;
    profileImage: string;
}

export const Friend = ({ id, name, profileImage }: FriendProps) => {
    return (
        <li className="-mx-0.5">
            <Link href={`/profile/${id}`}>
                <a>
                    <Image width="32" height="32" src={profileImage} alt="" title={name} className="rounded-full" />
                </a>
            </Link>
        </li>
    );
};
