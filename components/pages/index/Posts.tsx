import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import { CreatePost } from '@components/pages/index/CreatePost';
import { CreatePostModal } from '@components/pages/index/CreatePostModal';

export const Posts = () => {
	const [isCreatePostModalActive, setIsCreatePostModalActive] = useState(false);
	const { user } = useAuth();

	const handleOpenModal = () => setIsCreatePostModalActive(true);
	const handleCloseModal = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsCreatePostModalActive(false);
	};

	return (
		<div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
			<CreatePost handleOpenModal={handleOpenModal} />

			<CreatePostModal isModalActive={isCreatePostModalActive} handleCloseModal={handleCloseModal} />
		</div>
	);
};
