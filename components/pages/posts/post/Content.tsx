import * as React from 'react';

interface ContentProps {
	content: string;
}

export const Content = ({ content }: ContentProps) => {
	return (
		<div className="px-4">
			<span className="text-light-100">{content}</span>
		</div>
	);
};
