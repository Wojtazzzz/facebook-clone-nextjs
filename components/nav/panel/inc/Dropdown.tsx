import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { List as MessengerList } from '../messenger/list/List';
import { List as NotificationsList } from '../notifications/list/List';
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
            className="w-[300px] md:w-[360px] flex flex-col gap-3 bg-dark-200 absolute top-full -right-12 z-20 shadow-md rounded-md p-3"
        >
            <Header title={type} />

            {type === 'Messenger' ? <MessengerList close={close} /> : <NotificationsList close={close} />}
        </div>
    );
};
