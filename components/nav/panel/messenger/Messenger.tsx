import { memo } from 'react';
import { useAppDispatch } from '@hooks/redux';

import { Header } from '@components/nav/panel/inc/Header';
import { SearchUser } from '@components/nav/panel/messenger/SearchUser';
import { Messages } from '@components/nav/panel/messenger/Messages';
import { Overlay } from '@components/nav/panel/inc/Overlay';

import { toggleActive } from '@redux/slices/MessengerSlice';

export const Messenger = memo(() => {
    const dispatch = useAppDispatch();

    const handleToggle = () => dispatch(toggleActive());

    return (
        <>
            <div
                data-testid="messenger-container"
                className="min-w-[300px] md:min-w-[360px] flex flex-col gap-4 bg-dark-200 absolute top-full -right-24 z-10 shadow-md rounded-md p-3"
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

            <Overlay testid="messenger-overlay" callback={handleToggle} />
        </>
    );
});

Messenger.displayName = 'Messenger';
