import * as React from 'react';

interface MessageProps {
	text: string;
	isSended: boolean;
}

export const Message = ({ text, isSended }: MessageProps) => {
	return (
		<div className="w-full">
			<div
				className={`w-fit max-w-[75%] ${
					isSended ? 'bg-primary rounded-l-2xl ml-auto' : 'bg-dark-100 rounded-r-2xl'
				} text-light-50 py-2 px-3`}
			>
				{text}
			</div>
		</div>
	);
};