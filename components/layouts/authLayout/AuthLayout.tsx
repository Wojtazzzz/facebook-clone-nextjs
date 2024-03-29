import { Nav } from '@components/nav/Nav';
import { Menu } from '@components/menu/Menu';
import { Chat } from '@components/chat/Chat';
import type { ReactNode } from 'react';
import { useAuthMiddleware } from '../useAuthMiddleware';
import { AlertModal } from '@components/inc/alertModal/AlertModal';
import { useMenu } from './useMenu';
import { useChat } from '@hooks/useChat';
import { ConfirmModal } from '@components/inc/confirmModal/ConfirmModal';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    useAuthMiddleware('AUTH');
    const { friend } = useChat();
    const { isActive, toggle, close } = useMenu();

    return (
        <>
            <Nav toggleMenu={toggle} />
            <Menu isActive={isActive} close={close} />

            {children}

            <AlertModal />
            <ConfirmModal />

            {friend && <Chat friend={friend} />}
        </>
    );
};
