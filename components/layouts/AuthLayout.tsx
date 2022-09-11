import { Nav } from '@components/nav/Nav';
import { NavToggler } from '@components/nav/mobile/NavToggler';
import { Menu } from '@components/menu/Menu';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Chat } from '@components/chat/Chat';
import { Modal as CreatePostModal } from '@components/inc/modals/post/create/modal/Modal';
import type { ReactNode } from 'react';
import { useAppSelector } from '@hooks/redux';
import { useAuthMiddleware } from './useAuthMiddleware';
import { AlertModal } from '@components/inc/AlertModal';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    useAuthMiddleware('AUTH');
    const friend = useAppSelector((store) => store.chat.friend);

    return (
        <>
            <Nav />

            <div className="flex justify-between relative translate-y-14">
                <Menu />

                <main className="w-full max-w-[1024px] h-screen overflow-y-scroll mx-auto pb-14">{children}</main>

                <Sidebar />
            </div>

            <NavToggler />
            <CreatePostModal />
            <AlertModal />

            {!!friend && <Chat friend={friend} />}
        </>
    );
};
