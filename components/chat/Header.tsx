import * as React from 'react';import { useAppDispatch } from '@hooks/redux';

import Image from 'next/image';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/RoundedButton';

import { toggleActive } from '@redux/slices/ChatSlice';

interface HeaderProps {
	name: string;
	profileImage: string;
}

export const Header = ({ name, profileImage }: HeaderProps) => {
	const dispatch = useAppDispatch();

	const handleCloseChat = () => dispatch(toggleActive(undefined));

	return (
		<div className="w-full flex justify-between text-light-200 shadow-md p-3">
			<div className="flex items-center gap-2">
				<Image src={profileImage} width="32" height="32" alt={name} className="rounded-full" />

				<span className="font-medium">{name}</span>
			</div>

			<RoundedButton
				name="Close chat"
				icon={faTimes}
				size={8}
				bgColor="dark-200"
				onHover="bg-dark-100"
				callback={handleCloseChat}
			/>
		</div>
	);
};
