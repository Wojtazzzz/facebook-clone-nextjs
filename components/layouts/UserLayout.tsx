import * as React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/useAuth';

import { Nav } from '@components/nav/Nav';
import { Toggler } from '@components/nav/mobile/Toggler';
import { Sidebar } from '@components/sidebar/Sidebar';
import { Contacts } from '@components/contacts/Contacts';

import { AuthMiddleware } from '@enums/AuthMiddleware';
import { Chat } from '@components/chat/Chat';
import { useAppSelector } from '@hooks/redux';

export const UserLayout: React.FC = ({ children }) => {
	useAuth(AuthMiddleware.AUTH);
	const { route } = useRouter();

	const { isActive } = useAppSelector(state => state.chat);

	return (
		<>
			<Nav />

			<div className="flex justify-between relative translate-y-14">
				<Sidebar />

				<main className="w-full max-w-[1024px] h-screen overflow-y-scroll mx-auto pb-14">{children}</main>

				{route === '/' && <Contacts />}
			</div>

			<Toggler />

			{isActive && <Chat />}
		</>
	);
};
