import Image from 'next/future/image';

interface FriendInfoProps {
    name: string;
    profileImage: string;
}

export const FriendInfo = ({ name, profileImage }: FriendInfoProps) => {
    return (
        <header className="flex items-center gap-2">
            <Image src={profileImage} width="32" height="32" alt="" className="rounded-full" />
            <h2 className="font-medium">{name}</h2>
        </header>
    );
};
