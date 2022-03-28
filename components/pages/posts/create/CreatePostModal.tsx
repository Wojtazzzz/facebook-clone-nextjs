import * as React from 'react';
import { useState } from 'react';
import { useAuth } from '@hooks/useAuth';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faImages } from '@fortawesome/free-solid-svg-icons';
import { FileUploader } from 'react-drag-drop-files';
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
		backgroundColor: 'rgba(58, 59, 60, 0.6)',
		// opacity: 0.2,
		padding: '0 20px',
	},
};

interface CreatePostModalProps {
	isModalActive: boolean;
	handleCloseModal: (event: MouseEvent) => void;
}

export const CreatePostModal = ({ isModalActive, handleCloseModal }: CreatePostModalProps) => {
	const { user } = useAuth();
	const [file, setFile] = useState(null);
	const [isFilesUploadingActive, setIsFilesUploadingActive] = useState(false);
	const fileTypes = ['JPG', 'PNG', 'GIF'];

	const handleToggleIsFilesUploadingActive = () => setIsFilesUploadingActive(prevState => !prevState);

	const handleChange = file => {
		setFile(file);
	};

	if (!user) return <></>;

	return (
		<Modal isOpen={isModalActive} onRequestClose={handleCloseModal} style={modalStyles} contentLabel="Create Post">
			<div className="px-1">
				<div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
					<div className="w-full flex justify-between text-light-200 border-zinc-600 border-b-[1.5px] p-3">
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

					<div
						className={`w-full transition-opacity ${
							isFilesUploadingActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
						} p-3`}
					>
						<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
					</div>

					<div className="w-full p-3">
						<div className="w-full flex justify-between items-center border-[1.5px] border-dark-100 rounded-lg p-3">
							<span className="text-light-200 font-medium">Add to your post</span>

							<div className="flex gap-2">
								<button onClick={handleToggleIsFilesUploadingActive}>
									<FontAwesomeIcon icon={faImages} className="text-2xl text-green-400" />
								</button>
							</div>
						</div>
					</div>

					<div className="p-4 pt-0">
						<Button title="Post" styles="w-full" />
					</div>
				</div>
			</div>
		</Modal>
	);
};
