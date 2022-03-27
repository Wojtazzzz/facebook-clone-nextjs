import * as React from 'react';
import { useState } from 'react';

import { Header } from '@components/pages/posts/post/Header';
import { Content } from '@components/pages/posts/post/Content';
import { Images } from '@components/pages/posts/post/Images';
import { Stats } from '@components/pages/posts/post/Stats';
import { Panel } from '@components/pages/posts/post/Panel';

import type { PostType } from '@ctypes/features/PostType';

interface SinglePostProps extends PostType {}

export const SinglePost = ({
	id,
	content,
	images,
	author,
	likes_count,
	isLiked,
	created_at,
	updated_at,
}: SinglePostProps) => {
	const [likesCount, setLikesCount] = useState(likes_count);
	const [_isLiked, _setIsLiked] = useState(isLiked);

	const handleAddLike = () => {
		setLikesCount(prevState => prevState + 1);
		_setIsLiked(true);
	};

	const handleRemoveLike = () => {
		setLikesCount(prevState => prevState - 1);
		_setIsLiked(false);
	};

	return (
		<div className="w-full bg-dark-200 rounded-lg">
			<Header author={author} created_at={created_at} updated_at={updated_at} />

			<div className="w-full py-3">
				<Content content={content} />
				{images && <Images images={images} />}
			</div>

			<Stats likesCount={likesCount} />
			<Panel post_id={id} isLiked={_isLiked} handleAddLike={handleAddLike} handleRemoveLike={handleRemoveLike} />
		</div>
	);
};
