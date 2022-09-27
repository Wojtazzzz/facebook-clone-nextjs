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
        <li className="w-[31.5%] aspect-square">
            <Link href={`/profile/${id}`}>
                <a>
                    <div className="w-full h-full relative hover:brightness-110 transition-filter">
                        <Image layout="fill" src={profile_image} alt="" className="rounded-lg" />
                    </div>

                    <span className="text-xs font-semibold text-light-50 mt-1">{name}</span>
                </a>
            </Link>
        </li>
    );
};
