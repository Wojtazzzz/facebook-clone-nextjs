/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/future/image';
import Link from 'next/link';

interface ProfileImageProps {
    id: number;
    name: string;
    profileImage: string;
}

export const ProfileImage = ({ id, name, profileImage }: ProfileImageProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a
                aria-label={name}
                className="flex justify-center relative items-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl"
            >
                <Image src={profileImage} fill alt="" className="w-full h-full rounded-xl" />
            </a>
        </Link>
    );
};
