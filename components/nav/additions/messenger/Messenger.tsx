import * as React from 'react';
import { memo } from 'react';

import { Header } from '@components/nav/additions/messenger/Header';
import { Search } from '@components/nav/additions/messenger/Search';
import { Messages } from '@components/nav/additions/messenger/Messages';

export const Messenger = memo(() => {
	return (
		<div className="min-w-[300px] md:min-w-[360px] flex flex-col gap-4 bg-dark-200 absolute top-full -right-24 shadow-md rounded-md p-3">
			<Header />
			<Search />
			<Messages />
		</div>
	);
});

Messenger.displayName = 'Messenger';
