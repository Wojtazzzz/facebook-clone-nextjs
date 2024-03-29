import { Avatar } from '@components/inc/Avatar';

interface FriendAvatarProps {
    profileImage: string;
}

export const FriendAvatar = ({ profileImage }: FriendAvatarProps) => {
    return (
        <div className="h-full flex items-center px-1.5">
            <Avatar src={profileImage} alt="" styles="w-[28px] h-[28px]" />
        </div>
    );
};
