import { Notifications } from '@components/nav/panel/notifications/Notifications';
import { Logout } from './logout/Logout';
import { Messenger } from './messenger/Messenger';
import { ToggleMenu } from './ToggleMenu';

interface PanelProps {
    toggleMenu: () => void;
}

export const Panel = ({ toggleMenu }: PanelProps) => {
    return (
        <div className="h-full flex justify-end items-center gap-2">
            <ToggleMenu toggle={toggleMenu} />

            <Messenger />
            <Notifications />

            <Logout />
        </div>
    );
};
