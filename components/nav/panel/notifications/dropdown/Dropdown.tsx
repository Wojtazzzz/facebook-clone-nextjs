import { useAppDispatch } from '@hooks/redux';
import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { toggleActive } from '@redux/slices/NotificationsSlice';
import { List } from './list/List';
import { Header } from './Header';

export const Dropdown = () => {
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(toggleActive(false));

    useKey('Escape', handleClose);
    const ref = useOutsideClick(handleClose);

    return (
        <div
            data-testid="notifications-dropdown"
            ref={ref}
            className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 z-20 shadow-md rounded-md p-3"
        >
            <Header title="Notifications" />
            <List />
        </div>
    );
};
