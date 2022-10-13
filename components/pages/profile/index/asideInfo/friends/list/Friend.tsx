import Image from 'next/future/image';
import Link from 'next/link';

interface FriendProps {
    id: number;
    name: string;
    profile_image: string;
}

export const Friend = ({ id, name, profile_image }: FriendProps) => {
    return (
        <li className="w-[33%] overflow-hidden">
            <div className="w-full px-1 py-2">
                <Link href={`/profile/${id}`}>
                    <a>
                        <div className="w-full aspect-square relative hover:brightness-110 transition-filter">
                            <Image fill src={profile_image} alt="" className="w-full h-full rounded-lg" />
                        </div>

                        <span className="text-[11px] font-semibold leading-[0.5] truncate text-light-50 mt-1">
                            {name}
                        </span>
                    </a>
                </Link>
            </div>
        </li>
    );
};
