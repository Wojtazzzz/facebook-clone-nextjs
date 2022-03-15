import * as React from 'react';

import type { ChatMessageType } from '@ctypes/features/ChatMessageType';

interface MessageProps extends ChatMessageType {
	isFromLoggedUser: boolean;
}

export const Message = ({ text, created_at, isFromLoggedUser }: MessageProps) => {
	return (
		<div className="w-full">
			<div
				title={`Wysłono:  ${created_at}`}
				className={`w-fit max-w-[75%] ${
					isFromLoggedUser ? 'bg-primary rounded-l-2xl ml-auto' : 'bg-dark-100 rounded-r-2xl'
				} text-light-50 py-2 px-3`}
			>
				{text}
			</div>
		</div>
	);
};
