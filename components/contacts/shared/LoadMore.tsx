import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { ListLoader } from '@components/contacts/shared/ListLoader';

interface LoadMoreProps {
	isLoading: boolean;
	callback: () => void;
}

export const LoadMore = ({ isLoading, callback }: LoadMoreProps) => {
	if (isLoading) return <ListLoader />;

	return (
		<button
			className="w-full flex justify-center items-center gap-5 hover:bg-dark-100 active:opacity-20 rounded-lg transition-colors cursor-pointer mt-3 py-1 px-5"
			onClick={callback}
		>
			<span className="text-light-200 font-medium">
				<FontAwesomeIcon icon={faArrowDown} />
			</span>
		</button>
	);
};
