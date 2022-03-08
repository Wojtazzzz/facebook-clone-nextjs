import * as React from 'react';

import SkeletonLoader from 'tiny-skeleton-loader-react';

interface SkeletonLoadingProps {
	style?: {};
	styles?: string;
	isCircle?: boolean;
}

export const SkeletonLoading = ({ styles = '', style, isCircle = false }: SkeletonLoadingProps) => {
	return (
		<div className={styles} style={style}>
			<SkeletonLoader background="#242526" width="100%" height="100%" circle={isCircle} />
		</div>
	);
};
