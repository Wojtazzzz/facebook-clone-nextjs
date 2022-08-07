import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { toggleActive } from '@redux/slices/NotificationsSlice';
import { RoundedButton } from '@components/inc/RoundedButton';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from './dropdown/Dropdown';

export const Notifications = memo(() => {
    const dispatch = useAppDispatch();
    const { isActive } = useAppSelector((store) => store.notifications);

    const handleToggle = () => dispatch(toggleActive(true));

    return (
        <div className="relative">
            <RoundedButton name="Notifications" icon={faBell} onHover="opacity-70" callback={handleToggle} />

            {isActive && <Dropdown />}
        </div>
    );
});

Notifications.displayName = 'Notifications';
