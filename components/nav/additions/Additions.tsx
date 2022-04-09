import { useAuth } from '@hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@hooks/redux';

import { faBell, faEllipsisVertical, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Messenger } from '@components/nav/additions/messenger/Messenger';
import { Notifications } from '@components/nav/additions/notifications/Notifications';
import { RoundedButton } from '@components/RoundedButton';

import { toggleActive as toggleActiveSidebar } from '@redux/slices/SidebarSlice';
import { toggleActive as toggleActiveMessenger } from '@redux/slices/MessengerSlice';
import { toggleActive as toggleActiveNotificationsList } from '@redux/slices/NotificationsListSlice';

export const Additions = () => {
    const { logout, isLoading } = useAuth();
    const dispatch = useAppDispatch();
    const {
        messenger: { isActive: isMessengerActive },
        notificationsList: { isActive: isNotificationsListActive },
    } = useAppSelector((state) => state);

    const handleLogout = () => logout();
    const handleToggleSidebar = () => dispatch(toggleActiveSidebar());
    const handleToggleMessenger = () => dispatch(toggleActiveMessenger());
    const handleToggleNotificationsList = () => dispatch(toggleActiveNotificationsList());

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

                {isMessengerActive && (
                    <>
                        <div className="w-full h-full fixed top-0 left-0" onClick={handleToggleMessenger}></div>
                        <Messenger />
                    </>
                )}
            </div>

            <div className="relative">
                <RoundedButton
                    name="Notifications"
                    icon={faBell}
                    onHover="opacity-70"
                    callback={handleToggleNotificationsList}
                />

                {isNotificationsListActive && (
                    <>
                        <div className="w-full h-full fixed top-0 left-0" onClick={handleToggleNotificationsList}></div>
                        <Notifications />
                    </>
                )}
            </div>

            <RoundedButton name="Log out" icon={faRightFromBracket} onHover="opacity-70" callback={handleLogout} />
        </div>
    );
};
