/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from 'next/image';
import Link from 'next/link';

interface ProfileImageProps {
    id: number;
    profileImage: string;
}

export const ProfileImage = ({ id, profileImage }: ProfileImageProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a className="flex justify-center relative items-center w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-xl">
                <Image src={profileImage} layout="fill" alt="" className="rounded-xl" />
            </a>
        </Link>
    );
};
