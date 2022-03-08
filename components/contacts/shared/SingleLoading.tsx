import * as React from 'react';

import { SkeletonLoading } from '@components/SkeletonLoading';

import { getRandomInt } from '@lib/getRandomInt';

export const SingleLoading = () => {
	return (
		<div className="w-full flex items-center gap-3 hover:bg-dark-100 rounded-lg transition-colors cursor-pointer p-2">
			<SkeletonLoading styles="w-[36px] h-[36px]" isCircle />
			<SkeletonLoading style={{ width: `${getRandomInt(60, 140)}px` }} styles={'h-[20px]'} />
		</div>
	);
};
