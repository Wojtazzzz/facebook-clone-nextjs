import * as React from 'react';
import { useEffect } from 'react';
import { useAuth } from '@hooks/useAuth';
import { useAxios } from '@hooks/useAxios';

import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Content } from '@components/pages/posts/create/modal/Content';

import type { MouseEvent } from 'react';
import type { CreatePostPayload } from '@ctypes/forms/CreatePostPayload';

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

interface CreatePostModalProps {
	isModalActive: boolean;
	handleCloseModal: (event: MouseEvent) => void;
}

export const CreatePostModal = ({ isModalActive, handleCloseModal }: CreatePostModalProps) => {
	const { user } = useAuth();
	const { state, sendRequest } = useAxios();

	useEffect(() => {
		Modal.setAppElement('body');
	}, []);

	const createPost = (data: CreatePostPayload) => {
		const formData = new FormData();
		formData.append('content', data.content);

		data.images.forEach(img => {
			formData.append('images[]', img);
		});

		sendRequest({ method: 'POST', url: '/api/posts', data: formData });
	};

	if (!user) return <></>;

	return (
		<Modal contentLabel="Create Post" isOpen={true} style={modalStyles} onRequestClose={handleCloseModal}>
			<div className="px-1">
				<div className="h-full flex flex-col bg-dark-200 rounded-lg mx-auto">
					<div className="w-full flex justify-between text-light-200 border-zinc-600 border-b-[1.5px] p-3">
						<FontAwesomeIcon className="w-8 text-lg invisible pointer-events-none" icon={faTimes} />

						<h2 className="text-2xl text-center font-bold">Create Post</h2>

						<div
							className="w-8 h-8 flex justify-center items-center hover:bg-dark-200 rounded-full transition-colors cursor-pointer"
							onClick={handleCloseModal}
						>
							<FontAwesomeIcon icon={faTimes} className="text-lg" />
						</div>
					</div>

					<Content state={state} user={user} createPost={createPost} />
				</div>
			</div>
		</Modal>
	);
};
