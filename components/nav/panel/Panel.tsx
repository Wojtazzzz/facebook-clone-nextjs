import { Notifications } from '@components/nav/panel/notifications/Notifications';
import { Logout } from './logout/Logout';
import { Messenger } from './messenger/Messenger';
import { ToggleMenu } from './ToggleMenu';

interface PanelProps {
    toggleMenu: () => void;
}

export const Panel = ({ toggleMenu }: PanelProps) => {
    return (
        <div className="w-3/5 lg:w-1/3 flex justify-end items-center gap-2 transition-transform ease-in duration-150 my-1">
            <ToggleMenu toggle={toggleMenu} />

            <Messenger />
            <Notifications />

            <Logout />
        </div>
    );
};
