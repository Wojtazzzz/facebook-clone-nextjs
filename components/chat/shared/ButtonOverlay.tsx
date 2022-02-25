import * as React from 'react';

interface ButtonOverlayProps {
	type?: 'button' | 'submit';
	callback: () => void;
}

export const ButtonOverlay: React.FC<ButtonOverlayProps> = ({ type = 'button', callback, children }) => {
	return (
		<button type={type} className="w-[30px] h-[30px] rounded-full hover:bg-dark-100 transition-colors" onClick={callback}>
			{children}
		</button>
	);
};
