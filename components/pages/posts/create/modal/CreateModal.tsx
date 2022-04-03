import * as React from 'react';
import { useEffect } from 'react';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@components/pages/posts/create/modal/Form';

import type { MouseEvent } from 'react';
import { RoundedButton } from '@components/RoundedButton';

const modalStyles = {
	content: {
		width: '100%',
		maxWidth: 520,
		minWidth: 300,
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		padding: 0,
		border: '',
		borderRadius: '',
		background: '',
	},
	overlay: {
		backgroundColor: 'rgba(58, 59, 60, 0.6)',
		padding: '0 20px',
	},
};

interface CreateModalProps {
	handleCloseModal: (event: MouseEvent) => void;
}

export const CreateModal = ({ handleCloseModal }: CreateModalProps) => {
	useEffect(() => {
		Modal.setAppElement('body');
	}, []);

	return (
		<Modal contentLabel="Create Post" isOpen={true} style={modalStyles} onRequestClose={handleCloseModal}>
			<div className="px-1">
				<div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
					<div className="w-full flex justify-between text-light-200 border-zinc-600 border-b-[1.5px] p-3">
						<FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />

						<h2 className="text-2xl text-center font-bold">Create Post</h2>

						<RoundedButton
							name="Close modal"
							icon={faTimes}
							size={8}
							bgColor="dark-200"
							onHover="bg-dark-100"
							callback={handleCloseModal}
						/>
					</div>

					<Form />
				</div>
			</div>
		</Modal>
	);
};
