import * as React from 'react';

import Image from 'next/image';

interface ApiErrorProps {
	isSmall?: boolean;
}

export const ApiError: React.FC<ApiErrorProps> = ({ isSmall = false }) => {
	return (
		<div className="w-full flex flex-col justify-center items-center mt-12">
			<Image width={isSmall ? '100' : '150'} height={isSmall ? '100' : '150'} src="/img/not_available.svg" alt="Fatal server error" />

			<span className={`${isSmall ? 'text-lg' : 'text-2xl'} text-light-100 text-center font-bold mt-5`}>Something went wrong...</span>
			<span className={`${isSmall ? 'text-lg' : 'text-2xl'} text-light-100 text-center font-bold`}>Please try again later</span>
		</div>
	);
};
