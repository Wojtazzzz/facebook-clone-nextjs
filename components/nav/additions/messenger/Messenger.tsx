import { memo } from 'react';

import { Header } from '@components/nav/additions/shared/Header';
import { Search } from '@components/nav/additions/messenger/Search';
import { Messages } from '@components/nav/additions/messenger/Messages';

export const Messenger = memo(() => {
    return (
        <div
            data-testid="messenger-container"
            className="min-w-[300px] md:min-w-[360px] flex flex-col gap-4 bg-dark-200 absolute top-full -right-24 shadow-md rounded-md p-3"
        >
            <Header testid="messenger-header" title="Messenger" />
            <Search />

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
