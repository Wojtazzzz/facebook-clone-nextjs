import { Notifications } from '@components/nav/panel/notifications/Notifications';
import { Logout } from './Logout';
import { Messenger } from './messenger/Messenger';
import { OpenSidebar } from './OpenSidebar';

export const Panel = () => {
    return (
        <div className="h-full flex justify-end items-center gap-2">
            <OpenSidebar />

            <Messenger />
            <Notifications />

            <Logout />
        </div>
    );
};
