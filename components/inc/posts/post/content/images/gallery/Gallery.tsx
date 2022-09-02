import { useKey } from '@hooks/useKey';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import Swiper, { Keyboard, Pagination, Navigation } from 'swiper';
import { Slide } from './Slide';
import { CloseButton } from './CloseButton';

interface GalleryProps {
    images: string[];
    closeGallery: () => void;
}

Swiper.use([Keyboard, Pagination, Navigation]);

export const Gallery = ({ images, closeGallery }: GalleryProps) => {
    useKey('Escape', closeGallery);

    const SlidesComponents = images.map((image, i) => (
        <SwiperSlide key={i}>
            <Slide image={image} />
        </SwiperSlide>
    ));

    return (
        <section aria-label="Post gallery" className="w-full h-full fixed top-0 left-0 bg-black z-30">
            <CloseButton closeGallery={closeGallery} />

            <SwiperReact
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                className="mySwiper w-full h-full"
            >
                {SlidesComponents}

                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </SwiperReact>
        </section>
    );
};
