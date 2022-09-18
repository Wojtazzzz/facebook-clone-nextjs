import { List as MessengerList } from '../messenger/list/List';
import { List as NotificationsList } from '../notifications/list/List';
import { Header } from './Header';
import * as Popover from '@radix-ui/react-popover';

interface DropdownProps {
    type: 'Messenger' | 'Notifications';
    close: () => void;
}

export const Dropdown = ({ type, close }: DropdownProps) => {
    return (
        <Popover.Portal>
            <Popover.Content
                align="end"
                className="z-50"
                onEscapeKeyDown={close}
                onPointerDownOutside={close}
                onFocusOutside={close}
                collisionPadding={30}
            >
                <div
                    data-testid="dropdown"
                    className="w-[260px] sm:w-[300px] md:w-[360px] flex flex-col gap-3 bg-dark-200 shadow-lg rounded-xl p-3"
                >
                    <Header title={type} />

                    {type === 'Messenger' ? <MessengerList close={close} /> : <NotificationsList close={close} />}
                </div>
            </Popover.Content>
        </Popover.Portal>
    );
};
