import * as React from 'react';

import SkeletonLoader from 'tiny-skeleton-loader-react';

export const SideItemLoader = () => {
	return (
		<div className="h-12 flex items-center gap-2 hover:bg-dark-100 transition-colors rounded-md p-1">
			<div className="w-12 flex justify-center items-center text-light-200 text-xl">
				<div className="w-8 h-8">
					<SkeletonLoader background="#242526" style={{ width: '100%', height: '100%' }} circle={true} />
				</div>
			</div>

			<div className="w-full text-light-200 font-medium">
				<div className="w-48 h-8">
					<SkeletonLoader background="#242526" style={{ width: '100%', height: '100%' }} />
				</div>
			</div>
		</div>
	);
};
