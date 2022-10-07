import { FriendInfo } from './FriendInfo';

interface EmptyChatProps {
    name: string;
    profileImage: string;
}

export const EmptyChat = ({ name, profileImage }: EmptyChatProps) => {
    return (
        <div className="w-full h-full flex justify-center items-center pr-2">
            <FriendInfo name={name} profileImage={profileImage} />
        </div>
    );
};
