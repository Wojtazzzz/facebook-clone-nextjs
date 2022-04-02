import * as React from 'react';import { useState } from 'react';

import { Mock } from '@components/pages/posts/create/Mock';
import { CreatePostModal } from '@components/pages/posts/create/modal/CreatePostModal';
import { List } from '@components/pages/posts/List';

import type { MouseEvent } from 'react';

export const Posts = () => {
	const [isCreatePostModalActive, setIsCreatePostModalActive] = useState(false);

	const handleOpenModal = () => setIsCreatePostModalActive(true);
	const handleCloseModal = (event: MouseEvent) => {
		event.stopPropagation();
		setIsCreatePostModalActive(false);
	};

	return (
		<div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
			<div id="scrollableDiv" className="h-screen flex flex-col gap-4 overflow-auto scrollbar-none">
				<Mock handleOpenModal={handleOpenModal} />

				<List />
			</div>

			{isCreatePostModalActive && (
				<CreatePostModal isModalActive={isCreatePostModalActive} handleCloseModal={handleCloseModal} />
			)}
		</div>
	);
};
