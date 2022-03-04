import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAppDispatch } from '@hooks/redux';

import { faBell, faEllipsisVertical, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Button } from '@components/nav/additions/shared/Button';
import { Messenger } from '@components/nav/additions/messenger/Messenger';

import { toggleActive } from '@redux/slices/SidebarSlice';

export const Additions = () => {
	const [isMessengerActive, setIsMessengerActive] = useState(false);
	const { logout, isLoading } = useAuth();
	const dispatch = useAppDispatch();

	const handleLogout = () => logout();
	const handleToggleSidebar = () => dispatch(toggleActive());
	const handleToggleMessenger = () => setIsMessengerActive(prevState => !prevState);

	return (
		<div className="h-full flex justify-end items-center gap-2">
			<div className="lg:hidden">
				<Button name="Sidebar" icon={faEllipsisVertical} callback={handleToggleSidebar} />
			</div>

			<div className="relative">
				<Button name="Messenger" icon={faFacebookMessenger} callback={handleToggleMessenger} />

				{/* {isMessengerActive && <Messenger />} */}
				{true && (
					<>
						<div className="w-full h-full fixed top-0 left-0" onClick={handleToggleMessenger}></div>
						<Messenger />
					</>
				)}
			</div>

			<Button name="Notifications" icon={faBell} callback={() => console.log('Action..')} />

			<div className={isLoading ? 'opacity-60 hover:opacity-60' : ''}>
				<Button name="Log out" icon={faRightFromBracket} callback={handleLogout} />
			</div>
		</div>
	);
};
