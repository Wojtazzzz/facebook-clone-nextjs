import Image from 'next/image';
import { Friend } from '@components/pages/profile/hero/user/Friend';
import type { IProfileFriendsData } from '@utils/types';

interface UserProps {
    id: number;
    firstName: string;
    name: string;
    profileImage: string;
    friends: IProfileFriendsData;
}

export const User = ({ firstName, name, profileImage, friends }: UserProps) => {
    const FriendsComponents = friends.list.map(({ id, name, profile_image }, i) => {
        if (i >= 5) return;
        return <Friend key={id} id={id} name={name} profileImage={profile_image} />;
    });

    return (
        <div className="w-full flex items-center gap-5">
            <div className="w-[120px] sm:w-[140px] lg:w-[168px] h-[120px] sm:h-[140px] lg:h-[168px] relative">
                <Image
                    layout="fill"
                    src={profileImage}
                    alt={`${firstName} profile image`}
                    className="rounded-full border-4 border-dark-200"
                />
            </div>

            <header className="flex flex-col gap-1.5 mt-12">
                <h2 className="text-2xl xl:text-3xl text-light-200 font-bold">{name}</h2>
                <span className="xl:text-lg text-light-100 font-medium -my-1.5">{friends.amount} Friends</span>

                <ul data-testid="profile-friendsList" className="flex">
                    {FriendsComponents}
                </ul>
            </header>
        </div>
    );
};
