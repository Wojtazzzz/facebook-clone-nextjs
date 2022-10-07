import { Avatar } from '@components/inc/Avatar';

interface FriendInfoProps {
    name: string;
    profileImage: string;
}

export const FriendInfo = ({ name, profileImage }: FriendInfoProps) => {
    return (
        <div data-testid="chat-friendInfo" className="flex flex-col items-center gap-3 pb-28">
            <Avatar src={profileImage} alt={name} styles="w-[60px] h-[60px]" />

            <p className="text-white font-medium">{name}</p>
        </div>
    );
};
