import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { toggleActive } from '@redux/slices/NotificationsSlice';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { OpenButton } from '../inc/OpenButton';
import { Dropdown } from '../inc/Dropdown';

export const Notifications = memo(() => {
    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector((store) => store.notifications);

    const handleOpen = () => dispatch(toggleActive(true));
    const handleClose = () => dispatch(toggleActive(false));

    return (
        <div className="relative">
            <OpenButton name="Notifications" icon={faBell} callback={handleOpen} />

            {isActive && <Dropdown type="Notifications" close={handleClose} />}
        </div>
    );
});

Notifications.displayName = 'Notifications';
