import { Nav } from '@components/nav/Nav';
import { NavToggler } from '@components/nav/mobileNavbar/NavToggler';
import { Menu } from '@components/menu/Menu';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Chat } from '@components/chat/Chat';
import type { ReactNode } from 'react';
import { useAppSelector } from '@hooks/redux';
import { useAuthMiddleware } from '../useAuthMiddleware';
import { AlertModal } from '@components/inc/AlertModal';
import { useMenu } from './useMenu';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    useAuthMiddleware('AUTH');
    const friend = useAppSelector((store) => store.chat.friend);
    const { isActive, toggle, close } = useMenu();

    return (
        <>
            <Nav toggleMenu={toggle} />

            <div className="flex justify-between relative translate-y-14">
                <Menu isActive={isActive} close={close} />

                <main className="w-full max-w-[1024px] h-screen overflow-y-scroll mx-auto pb-14">{children}</main>

                <Sidebar />
            </div>

            <AlertModal />

            {!!friend && <Chat friend={friend} />}
        </>
    );
};
