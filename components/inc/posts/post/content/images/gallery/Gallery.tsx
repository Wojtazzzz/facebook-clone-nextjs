import { useKey } from '@hooks/useKey';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper, { Keyboard, Pagination, Navigation } from 'swiper';
import { Slide } from './Slide';
import { CloseButton } from './CloseButton';
import { useOutsideClick } from '@hooks/useOutsideClick';
import { Controls } from './controls/Controls';

interface GalleryProps {
    images: string[];
    closeGallery: () => void;
}

Swiper.use([Keyboard, Pagination, Navigation]);

export const Gallery = ({ images, closeGallery }: GalleryProps) => {
    useKey('Escape', closeGallery);
    const ref = useOutsideClick(closeGallery);

    const SlidesComponents = images.map((image, i) => (
        <SwiperSlide key={i} role="group" aria-roledescription="slide">
            <Slide label={`${i + 1} of ${images.length}`} image={image} />
        </SwiperSlide>
    ));

    return (
        <section
            ref={ref}
            role="region"
            aria-atomic="false"
            aria-live="polite"
            aria-roledescription="carousel"
            aria-label="Gallery of post images"
            className="w-screen h-screen fixed top-0 left-0 z-50 bg-black overflow-hidden"
        >
            <CloseButton closeGallery={closeGallery} />

            <SwiperReact
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                className="w-full h-full"
            >
                {SlidesComponents}

                <Controls />
            </SwiperReact>
        </section>
    );
};
