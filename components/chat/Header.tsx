import * as React from 'react';
import { useAppDispatch } from '@hooks/redux';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ButtonOverlay } from '@components/chat/shared/ButtonOverlay';

import { toggleActive } from '@redux/slices/ChatSlice';

interface HeaderProps {
	name: string;
	profileImage: string;
}

export const Header: React.FC<HeaderProps> = ({ name, profileImage }) => {
	const dispatch = useAppDispatch();

	const handleClose = () => dispatch(toggleActive({ isActive: false }));

	return (
		<div className="w-full flex justify-between text-light-200 shadow-md p-3">
			<div className="flex items-center gap-2">
				<Image src={profileImage} width="32" height="32" alt={name} className="rounded-full" />

				<span className="font-medium">{name}</span>
			</div>

			<ButtonOverlay callback={handleClose}>
				<FontAwesomeIcon icon={faTimes} />
			</ButtonOverlay>
		</div>
	);
};
