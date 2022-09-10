import { Notifications } from '@components/nav/panel/notifications/Notifications';
import { Logout } from './logout/Logout';
import { Messenger } from './messenger/Messenger';
import { OpenMenu } from './OpenMenu';

export const Panel = () => {
    return (
        <div className="h-full flex justify-end items-center gap-2">
            <OpenMenu />

            <Messenger />
            <Notifications />

            <Logout />
        </div>
    );
};
