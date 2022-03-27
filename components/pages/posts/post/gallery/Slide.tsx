import * as React from 'react';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import type { Function } from '@ctypes/Function';

interface SlideProps {
	image: string;
	handleCloseGallery: Function<void>;
}

export const Slide = ({ image, handleCloseGallery }: SlideProps) => {
	return (
		<div className="w-full h-full flex justify-center relative">
			<div className="w-full flex justify-end absolute top-0 left-0 p-3">
				<button
					aria-label="Close gallery"
					title="Close gallery"
					className="w-10 h-10 flex justify-center items-center bg-dark-100 hover:opacity-80 rounded-full p-3"
					onClick={handleCloseGallery}
				>
					<FontAwesomeIcon icon={faTimes} className="text-lg text-light-50" />
				</button>
			</div>

			<div className="w-2/3 relative">
				<Image layout="fill" src={image} objectFit="cover" alt="" />
			</div>
		</div>
	);
};
