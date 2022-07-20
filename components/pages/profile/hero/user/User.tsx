import Image from 'next/image';
import { Friend } from '@components/pages/profile/hero/user/Friend';

import type { IProfileFriendsData } from '@utils/types';

interface UserProps {
    id: number;
    first_name: string;
    name: string;
    profile_image: string;
    friends: IProfileFriendsData;
}

export const User = ({ first_name, name, profile_image, friends }: UserProps) => {
    const FriendsComponents = friends.list.map(({ id, name, profile_image }, i) => {
        if (i >= 5) return;
        return <Friend key={id} id={id} name={name} profile_image={profile_image} />;
    });

    return (
        <div className="w-full flex items-center gap-5">
            <div className="w-[120px] sm:w-[140px] lg:w-[168px] h-[120px] sm:h-[140px] lg:h-[168px] relative">
                <Image
                    layout="fill"
                    src={profile_image}
                    alt={`${first_name} profile image`}
                    className="rounded-full border-4 border-dark-200"
                />
            </div>

            <div className="flex flex-col gap-1.5 mt-12">
                <h3 className="text-2xl xl:text-3xl text-light-200 font-bold">{name}</h3>
                <span className="xl:text-lg text-light-100 font-medium -my-1.5">{friends.amount} Friends</span>

                <ul data-testid="profile-friendsList" className="flex">
                    {FriendsComponents}
                </ul>
            </div>
        </div>
    );
};
