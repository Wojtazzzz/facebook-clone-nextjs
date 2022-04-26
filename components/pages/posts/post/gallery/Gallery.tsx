import { useEffect, useCallback } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation } from 'swiper';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Slide } from '@components/pages/posts/post/gallery/Slide';
import { RoundedButton } from '@components/inc/RoundedButton';

interface GalleryProps {
    images: string[];
    handleCloseGallery: () => void;
}

export const Gallery = ({ images, handleCloseGallery }: GalleryProps) => {
    const handleCloseGalleryOnEscPress = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                handleCloseGallery();
            }
        },
        [handleCloseGallery]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleCloseGalleryOnEscPress, false);

        return () => document.removeEventListener('keydown', handleCloseGalleryOnEscPress, false);
    }, [handleCloseGalleryOnEscPress]);

    const SlidesComponents = images.map((image, i) => (
        <SwiperSlide key={i}>
            <Slide image={image} />
        </SwiperSlide>
    ));

    return (
        <div className="w-full h-full fixed top-0 left-0 bg-black z-30">
            <div className="w-full flex justify-end absolute top-0 left-0 z-20 p-3">
                <RoundedButton name="Close gallery" icon={faTimes} size={10} callback={handleCloseGallery} />
            </div>

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
