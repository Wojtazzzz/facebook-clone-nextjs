import * as React from 'react';

import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Images } from '@components/pages/posts/post/Images';
import { Panel } from '@components/pages/posts/post/Panel';

import type { PostType } from '@ctypes/features/PostType';

interface SinglePostProps extends PostType {}

export const SinglePost = ({ content, images, author, created_at, updated_at }: SinglePostProps) => {
	return (
		<div className="w-full bg-dark-200 rounded-lg">
			<Header author={author} created_at={created_at} updated_at={updated_at} />

			<div className="w-full py-3">
				<Content content={content} />
				{images && <Images images={images} />}
			</div>

			<Panel />
		</div>
	);
};
