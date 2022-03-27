import * as React from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';

export const CreatePostLoader = () => {
	return (
		<div className="w-full bg-dark-200 rounded-lg p-3">
			<div className="flex gap-3">
				<SkeletonLoading classNames="w-[55px] h-[50px]" isCircle />
				<SkeletonLoading classNames="w-full p-2" />
			</div>
		</div>
	);
};
