import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import Image from 'next/image';
import { CreatePostLoader } from '@components/pages/index/CreatePostLoader';

export const CreatePost: React.FC = () => {
	const { user } = useAuth();

	if (!user) return <CreatePostLoader />;

	const handleCreatePost = () => alert('Coming soon');

	return (
		<div className="w-full bg-dark-200 rounded-lg p-3">
			<div className="flex gap-3">
				<Image
					src={user.profile_image}
					width="58"
					height="58"
					alt={`${user.first_name} profile image`}
					className="rounded-full"
				/>

				<button
					className="w-full bg-dark-100 text-light-100 text-left hover:opacity-70 rounded-3xl cursor-pointer px-3"
					onClick={handleCreatePost}
				>
					<span>What&apos;s on your mind, {user.first_name}?</span>
				</button>
			</div>
		</div>
	);
};
