import * as React from 'react';

import SkeletonLoader from 'tiny-skeleton-loader-react';

interface SkeletonLoadingProps {
	styles?: string;
	isCircle?: boolean;
}

export const SkeletonLoading = ({ styles = '', isCircle = false }: SkeletonLoadingProps) => {
	return (
		<div className={styles}>
			<SkeletonLoader background="#242526" style={{ width: '100%', height: '100%' }} circle={isCircle} />
		</div>
	);
};
