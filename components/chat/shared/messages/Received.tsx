import * as React from 'react';

interface ReceivedProps {
	text: string;
}

export const Received: React.FC<ReceivedProps> = ({ text }) => {
	return (
		<div className="w-full">
			<div className="w-fit max-w-[75%] bg-dark-100 text-light-50 rounded-r-2xl py-2 px-3">{text}</div>
		</div>
	);
};
