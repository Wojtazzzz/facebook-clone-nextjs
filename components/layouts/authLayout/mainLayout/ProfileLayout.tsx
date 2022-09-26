import { Hero } from '@components/pages/profile/hero/Hero';
import type { IProfileFriendsData, IUserProfile } from '@utils/types';
import type { ReactNode } from 'react';
import { MainLayout } from './MainLayout';

interface ProfileLayoutProps {
    user: IUserProfile;
    friends: IProfileFriendsData;
    children: ReactNode;
}

export const ProfileLayout = ({ user, friends, children }: ProfileLayoutProps) => {
    return (
        <MainLayout>
            <div className="w-full max-w-[1200px] flex flex-col gap-5 mx-auto lg:pl-[250px] xl:pl-[300px] box-content">
                <Hero user={user} friends={friends} />

                {children}
            </div>
        </MainLayout>
    );
};
