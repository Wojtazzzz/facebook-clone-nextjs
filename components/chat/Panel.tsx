import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { ButtonOverlay } from '@components/chat/shared/ButtonOverlay';
import { SendMessage } from '@components/chat/SendMessage';

interface PanelProps {
	friendId: number;
}

export const Panel: React.FC<PanelProps> = ({ friendId }) => {
	const handleSendImage = () => alert('Maybe in the future...');

	return (
		<div className="w-full flex justify-between items-center text-light-100 p-2">
			<ButtonOverlay callback={handleSendImage}>
				<FontAwesomeIcon icon={faImage} />
			</ButtonOverlay>

			<SendMessage friendId={friendId} />
		</div>
	);
};
