import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { faBell, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Messenger } from '@components/nav/panel/messenger/Messenger';
import { Notifications } from '@components/nav/panel/notifications/Notifications';
import { RoundedButton } from '@components/inc/RoundedButton';

import { toggleActive as toggleActiveSidebar } from '@redux/slices/SidebarSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';
import { toggleActive as toggleActiveNotifications } from '@redux/slices/NotificationsSlice';
import { Logout } from './Logout';

export const Panel = () => {
    const dispatch = useAppDispatch();
    const {
        messenger: { isActive: isMessengerActive },
        notifications: { isActive: isNotificationsActive },
    } = useAppSelector((state) => state);

    const handleToggleSidebar = () => dispatch(toggleActiveSidebar());

    const handleToggleMessenger = () => {
        dispatch(toggleActiveNotifications(false));
        dispatch(toggleActiveMessenger(!isMessengerActive));
    };

    const handleToggleNotifications = () => {
        dispatch(toggleActiveMessenger(false));
        dispatch(toggleActiveNotifications(!isNotificationsActive));
    };

    return (
        <div className="h-full flex justify-end items-center gap-2">
            <div className="lg:hidden">
                <RoundedButton
                    name="Sidebar"
                    icon={faEllipsisVertical}
                    onHover="opacity-70"
                    callback={handleToggleSidebar}
                />
            </div>

            <div className="relative">
                <RoundedButton
                    name="Messenger"
                    icon={faFacebookMessenger}
                    onHover="opacity-70"
                    callback={handleToggleMessenger}
                />

                {isMessengerActive && <Messenger />}
            </div>

            <div className="relative">
                <RoundedButton
                    name="Notifications"
                    icon={faBell}
                    onHover="opacity-70"
                    callback={handleToggleNotifications}
                />

                {isNotificationsActive && <Notifications />}
            </div>

            <Logout />
        </div>
    );
};
