import { useRouter } from 'next/router';
import { useAppSelector } from '@hooks/redux';
import { useAuth } from '@hooks/useAuth';

import { Nav } from '@components/nav/Nav';
import { Toggler } from '@components/nav/mobile/Toggler';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Contacts } from '@components/contacts/Contacts';
import { Chat } from '@components/chat/Chat';

import type { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    useAuth('AUTH');
    const { route } = useRouter();
    const { friend } = useAppSelector((state) => state.chat);

    return (
        <>
            <Nav />

            <div className="flex justify-between relative translate-y-14">
                <Sidebar />

                <main className="w-full max-w-[1024px] h-screen overflow-y-scroll mx-auto pb-14">{children}</main>

                {route === '/' && <Contacts />}
            </div>

            <Toggler />

            {!!friend && <Chat friend={friend} />}
        </>
    );
};
