import { Avatar } from '@components/inc/Avatar';
import Link from 'next/link';

interface AuthorImageProps {
    id: number;
    name: string;
    profileImage: string;
}

export const AuthorImage = ({ id, name, profileImage }: AuthorImageProps) => {
    return (
        <Link href={`/profile/${id}`}>
            <a aria-label={name}>
                <Avatar src={profileImage} alt="" styles="w-[36px] h-[36px]" />
            </a>
        </Link>
    );
};
