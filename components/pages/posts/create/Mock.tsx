import * as React from 'react';import { useAuth } from '@hooks/useAuth';

import { MockLoader } from '@components/pages/posts/create/MockLoader';
import { Avatar } from '@components/Avatar';

import type { Function } from '@ctypes/Function';

interface MockProps {
	handleOpenModal: Function<void>;
}

export const Mock = ({ handleOpenModal }: MockProps) => {
	const { user } = useAuth();

	if (!user) return <MockLoader />;

	return (
		<div className="w-full bg-dark-200 rounded-lg p-3">
			<div className="flex gap-3">
				<Avatar size={58} src={user.profile_image} alt={user.name} />

				<button
					className="w-full bg-dark-100 text-light-100 text-left hover:opacity-70 rounded-3xl cursor-pointer px-3"
					onClick={handleOpenModal}
				>
					<span>What&apos;s on your mind, {user.first_name}?</span>
				</button>
			</div>
		</div>
	);
};
