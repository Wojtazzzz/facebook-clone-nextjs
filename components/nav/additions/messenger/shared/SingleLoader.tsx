import * as React from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';

export const SingleLoader = () => {
	return (
		<div className="w-full h-[72px] flex gap-3 selection:rounded-lg cursor-pointer p-2">
			<SkeletonLoading styles="w-[56px] h-[56px]" isCircle />
			<SkeletonLoading />
		</div>
	);
};
