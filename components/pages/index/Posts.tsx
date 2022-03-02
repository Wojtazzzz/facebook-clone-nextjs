import * as React from 'react';

import { CreatePost } from '@components/pages/index/CreatePost';

export const Posts: React.FC = () => {
	return (
		<div className="max-w-[700px] flex flex-col gap-6 text-black mx-auto p-5">
			<CreatePost />
		</div>
	);
};
