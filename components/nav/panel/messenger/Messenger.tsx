import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { useKey } from '@hooks/useKey';
import { useOutsideClick } from '@hooks/useOutsideClick';

import { Header } from '@components/nav/panel/inc/Header';
import { SearchUser } from '@components/nav/panel/messenger/SearchUser';
import { Messages } from '@components/nav/panel/messenger/Messages';

import { toggleActive } from '@redux/slices/MessengerSlice';

export const Messenger = memo(() => {
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(toggleActive(false));

    useKey('Escape', handleClose);
    const ref = useOutsideClick(handleClose);

    return (
        <div
            data-testid="messenger-container"
            ref={ref}
            className="min-w-[300px] md:min-w-[360px] flex flex-col gap-4 bg-dark-200 absolute top-full -right-24 z-20 shadow-md rounded-md p-3"
        >
            <Header testid="messenger-header" title="Messenger" />
            <SearchUser />

            <div
                id="list-of-messenger-contacts"
                className="w-full max-h-[500px] overflow-y-scroll scrollbar-thin scrollbar-thumb-dark-100"
            >
                <Messages />
            </div>
        </div>
    );
});

Messenger.displayName = 'Messenger';
