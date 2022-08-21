import { Avatar } from '@components/inc/Avatar';

interface FriendAvatarProps {
    profileImage: string;
}

export const FriendAvatar = ({ profileImage }: FriendAvatarProps) => {
    return (
        <div className="flex items-end px-1.5">
            <Avatar size={28} src={profileImage} alt="" />;
        </div>
    );
};
