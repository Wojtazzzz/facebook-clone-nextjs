import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

export const useSwiperData = () => {
    const [swiper, setSwiper] = useState<SwiperType>();

    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: false,
        activeIndex: 0,
    });

    useEffect(() => {
        if (!swiper) return;

        swiper.on('slideChange', ({ isBeginning, isEnd, activeIndex }) => {
            setSlideConfig({ isBeginning, isEnd, activeIndex });
        });
    }, [swiper]);

    const handleSetSwiper = (swiper: SwiperType) => {
        setSwiper(swiper);
    };

    const handleSlidePrev = () => {
        swiper?.slidePrev();
    };

    const handleSlideNext = () => {
        swiper?.slideNext();
    };

    const handleSlideTo = (index: number) => {
        swiper?.slideTo(index);
    };

    return {
        ...slideConfig,
        setSwiper: handleSetSwiper,
        slidePrev: handleSlidePrev,
        slideNext: handleSlideNext,
        slideTo: handleSlideTo,
    };
};
