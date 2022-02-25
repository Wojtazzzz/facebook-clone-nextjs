import * as React from 'react';

interface SendedProps {
	text: string;
}

export const Sended: React.FC<SendedProps> = ({ text }) => {
	return (
		<div className="w-full">
			<div className="ml-auto w-fit max-w-[75%] bg-primary text-light-50 rounded-l-2xl py-2 px-3">{text}</div>
		</div>
	);
};
