import * as React from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';

export const CreatePostLoader: React.FC = () => {
	return (
		<div className="w-full bg-dark-200 rounded-lg p-3">
			<div className="flex gap-3">
				<SkeletonLoading styles="w-[55px] h-[50px]" isCircle />

				<SkeletonLoading styles="w-full p-2" />
			</div>
		</div>
	);
};
