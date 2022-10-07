import { useKey } from '@hooks/useKey';
import Swiper, { Keyboard, A11y } from 'swiper';
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Slide } from './Slide';
import { CloseButton } from './CloseButton';
import { Controls } from './controls/Controls';
import { Thumbs } from './thumbs/Thumbs';
import { useSwiperData } from './useSwiperData';

interface GalleryProps {
    images: string[];
    closeGallery: () => void;
}

Swiper.use([Keyboard, A11y]);

export const Gallery = ({ images, closeGallery }: GalleryProps) => {
    const { activeIndex, isBeginning, isEnd, setSwiper, setSwiperData, slideNext, slidePrev, slideTo } =
        useSwiperData();
    useKey('Escape', closeGallery);

    const SlidesComponents = images.map((image, i) => (
        <SwiperSlide key={i} aria-label={`${i + 1} of ${images.length}`} role="group" aria-roledescription="slide">
            <Slide image={image} />
        </SwiperSlide>
    ));

    return (
        <SwiperReact
            navigation={{
                nextEl: 'swiper-button-next',
                prevEl: 'swiper-button-prev',
            }}
            pagination={{ clickable: true }}
            spaceBetween={0}
            slidesPerView={1}
            role="region"
            aria-atomic="false"
            wrapperTag="section"
            onImagesReady={setSwiperData}
            onSwiper={setSwiper}
            onSlideChange={setSwiperData}
            aria-roledescription="carousel"
            aria-label="Gallery of post images"
            className="w-screen h-screen !fixed top-0 left-0 !z-50 bg-black overflow-hidden"
        >
            {SlidesComponents}

            <CloseButton closeGallery={closeGallery} />

            <Controls isBeginning={isBeginning} isEnd={isEnd} slidePrev={slidePrev} slideNext={slideNext} />

            <Thumbs images={images} activeIndex={activeIndex} slideTo={slideTo} />
        </SwiperReact>
    );
};
