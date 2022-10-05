import Image from 'next/future/image';
import { Friends } from './friends/Friends';

interface UserProps {
    id: number;
    firstName: string;
    name: string;
    profileImage: string;
}

export const User = ({ id, firstName, name, profileImage }: UserProps) => {
    return (
        <div className="w-full flex items-center gap-5">
            <div className="w-[120px] sm:w-[140px] lg:w-[168px] h-[120px] sm:h-[140px] lg:h-[168px] relative">
                <Image
                    fill
                    src={profileImage}
                    alt={`${firstName} profile image`}
                    className="w-full h-full rounded-full border-4 border-dark-200"
                />
            </div>

            <div className="flex flex-col gap-1.5 mt-12">
                <h2 className="text-2xl xl:text-3xl text-light-200 font-bold">{name}</h2>

                <Friends userId={id} />
            </div>
        </div>
    );
};
