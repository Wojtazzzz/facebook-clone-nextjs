import * as React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAppDispatch } from '@hooks/redux';

import { faBell, faEllipsisVertical, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@components/nav/additions/Button';

import { toggleActive } from '@redux/slices/SidebarSlice';

export const Additions = () => {
	const { logout, isLoading } = useAuth();
	const dispatch = useAppDispatch();

	const handleLogout = () => logout();
	const handleToggleSidebar = () => dispatch(toggleActive());

	return (
		<div className="h-full flex justify-end items-center gap-2">
			<div className="lg:hidden">
				<Button name="Sidebar" icon={faEllipsisVertical} callback={handleToggleSidebar} />
			</div>

			<Button name="Messenger" icon={faFacebookMessenger} callback={() => console.log('Action..')} />

			<Button name="Notifications" icon={faBell} callback={() => console.log('Action..')} />

			<div className={isLoading ? 'opacity-60 hover:opacity-60' : ''}>
				<Button name="Log out" icon={faRightFromBracket} callback={handleLogout} />
			</div>
		</div>
	);
};
