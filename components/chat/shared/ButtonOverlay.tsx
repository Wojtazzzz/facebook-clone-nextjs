import * as React from 'react';

interface ButtonOverlayProps {
	type?: 'button' | 'submit';
	callback: () => void;
	children: React.ReactNode;
}

export const ButtonOverlay = ({ type = 'button', callback, children }: ButtonOverlayProps) => {
	return (
		<button
			type={type}
			className="w-[30px] h-[30px] rounded-full hover:bg-dark-100 transition-colors"
			onClick={callback}
		>
			{children}
		</button>
	);
};
