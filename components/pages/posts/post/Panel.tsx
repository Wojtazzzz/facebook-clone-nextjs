import * as React from 'react';
import { useEffect } from 'react';
import { useAxios } from '@hooks/useAxios';

import { faMessage, faShare, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from '@components/pages/posts/post/shared/PanelButton';

import { StateStatus } from '@enums/StateStatus';

import type { Function } from '@ctypes/Function';

interface PanelProps {
	post_id: number;
	isLiked: boolean;
	handleAddLike: Function<void>;
	handleRemoveLike: Function<void>;
}

export const Panel = ({ post_id, isLiked, handleAddLike, handleRemoveLike }: PanelProps) => {
	const { state, sendRequest } = useAxios();

	const handleLike = () => {
		if (state.status === StateStatus.LOADING) return;

		if (isLiked) {
			handleRemoveLike();
			sendRequest({ method: 'DELETE', url: `/api/likes/${post_id}` });
		} else {
			handleAddLike();
			sendRequest({ method: 'POST', url: '/api/likes', data: { post_id } });
		}
	};

	// useEffect(() => {
	// 	if (state.status === StateStatus.ERROR) {
	// 		handleRemoveLike();
	// 	}
	// }, [handleRemoveLike, state]);

	return (
		<div className="w-full flex gap-2 justify-evenly border-t-2 border-t-dark-100 p-2">
			<PanelButton title="Like" icon={faThumbsUp} isActive={isLiked} callback={handleLike} />
			<PanelButton title="Comment" icon={faMessage} callback={() => console.log('Comment action..')} />
			<PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />
		</div>
	);
};
