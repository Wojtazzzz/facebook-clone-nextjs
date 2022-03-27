import * as React from 'react';
import { useEffect, useCallback } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper';
import { Slide } from './Slide';

import type { Function } from '@ctypes/Function';

interface GalleryProps {
	images: string[];
	handleCloseGallery: Function<void>;
}

export const Gallery = ({ images, handleCloseGallery }: GalleryProps) => {
	const handleCloseGalleryOnEscPress = useCallback(
		event => {
			if (event.key === 'Escape') {
				handleCloseGallery();
			}
		},
		[handleCloseGallery]
	);

	useEffect(() => {
		document.addEventListener('keydown', handleCloseGalleryOnEscPress, false);

		return () => {
			document.removeEventListener('keydown', handleCloseGalleryOnEscPress, false);
		};
	}, [handleCloseGalleryOnEscPress]);

	const SlidesComponents = images.map((image, i) => (
		<SwiperSlide key={i}>
			<Slide image={image} handleCloseGallery={handleCloseGallery} />
		</SwiperSlide>
	));

	return (
		<div className="w-full h-full fixed top-0 left-0 bg-black z-30">
			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				keyboard={{
					enabled: true,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Keyboard, Pagination, Navigation]}
				className="mySwiper w-full h-full"
			>
				{SlidesComponents}
			</Swiper>
		</div>
	);
};
