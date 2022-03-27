import * as React from 'react';

import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Panel } from '@components/pages/posts/post/Panel';

import type { PostType } from '@ctypes/features/PostType';

interface SinglePostProps extends PostType {}

export const SinglePost = ({ content, author, created_at, updated_at }: SinglePostProps) => {
	return (
		<div className="w-full bg-dark-200 rounded-lg">
			<Header author={author} created_at={created_at} updated_at={updated_at} />
			<Content content={content} />
			<Panel />
		</div>
	);
};
