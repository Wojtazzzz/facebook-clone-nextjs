import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { List as MessengerList } from '../messenger/list/List';
import { List as NotificationsLsit } from '../notifications/list/List';
import { Header } from './Header';

interface DropdownProps {
    type: 'Messenger' | 'Notifications';
    close: () => void;
}

export const Dropdown = ({ type, close }: DropdownProps) => {
    useKey('Escape', close);
    const ref = useOutsideClick(close);

    return (
        <div
            data-testid="dropdown"
            ref={ref}
            className="min-w-[300px] md:min-w-[360px] flex flex-col bg-dark-200 absolute top-full -right-12 z-20 shadow-md rounded-md p-3"
        >
            <Header title={type} />

            {type === 'Messenger' ? <MessengerList /> : <NotificationsLsit />}
        </div>
    );
};
