import { CloseChat } from '@components/chat/header/CloseChat';
import { FriendInfo } from '@components/chat/header/FriendInfo';

interface HeaderProps {
    name: string;
    profileImage: string;
}

export const Header = ({ name, profileImage }: HeaderProps) => {
    return (
        <header className="w-full flex justify-between text-light-200 shadow-md p-3">
            <FriendInfo name={name} profileImage={profileImage} />
            <CloseChat />
        </header>
    );
};
