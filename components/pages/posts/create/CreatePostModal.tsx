import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';

import type { MouseEvent } from 'react';

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
		backgroundColor: '',
		padding: '0 20px',
	},
};

interface CreatePostModalProps {
	isModalActive: boolean;
	handleCloseModal: (event: MouseEvent) => void;
}

export const CreatePostModal = ({ isModalActive, handleCloseModal }: CreatePostModalProps) => {
	const { user } = useAuth();

	if (!user) return <></>;

	return (
		<div>
			<Modal
				isOpen={isModalActive}
				onRequestClose={handleCloseModal}
				style={modalStyles}
				contentLabel="Create Post"
			>
				<div className="px-1">
					<div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
						<div className="w-full flex justify-between text-light-200 border-b-[1.5px] border-zinc-600 p-3">
							<FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />
							<h2 className="text-2xl text-center font-bold">Create Post</h2>

							<div
								className="w-8 h-8 flex justify-center items-center hover:bg-dark-200 rounded-full transition-colors cursor-pointer"
								onClick={handleCloseModal}
							>
								<FontAwesomeIcon className="text-lg" icon={faTimes} />
							</div>
						</div>

						<div className="w-full p-4">
							<div className="flex gap-3 mb-1">
								<Avatar src={user.profile_image} size="40" alt={`${user.first_name} profile image`} />

								<span className="text-sm text-light-100 font-bold mt-1">{user.name}</span>
							</div>

							<div className="w-full">
								<textarea
									className="w-full text-lg text-light-100 bg-transparent outline-none resize-none scrollbar-thin scrollbar-thumb-dark-200 p-3"
									placeholder={`What's on your mind, ${user.first_name}?`}
								></textarea>
							</div>
						</div>

						<div className="p-4 pt-0">
							<Button title="Post" styles="w-full" />
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
};
