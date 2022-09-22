import { Notifications } from '@components/nav/panel/notifications/Notifications';
import clsx from 'clsx';
import { Logout } from './logout/Logout';
import { Messenger } from './messenger/Messenger';
import { ToggleMenu } from './ToggleMenu';

interface PanelProps {
    toggleMenu: () => void;
}

export const Panel = ({ toggleMenu }: PanelProps) => {
    return (
        <div
            className={clsx(
                'w-3/5 lg:w-1/3 flex justify-end items-center gap-2 transition-transform ease-in duration-150 my-1'
                // isSearchActive ? 'translate-x-[220px] sm:translate-x-0' : 'translate-x-0'
            )}
        >
            <ToggleMenu toggle={toggleMenu} />

            <Messenger />
            <Notifications />

            <Logout />
        </div>
    );
};
