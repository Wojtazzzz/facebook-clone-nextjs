import { useCallback, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

export const useSwiperData = () => {
    const [swiper, setSwiper] = useState<SwiperType>();
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: false,
        activeIndex: 0,
    });

    const setSwiperData = useCallback(({ isBeginning, isEnd, activeIndex, slides }: SwiperType) => {
        setSlideConfig({
            isBeginning,
            isEnd: slides.length === 1 || isEnd,
            activeIndex,
        });
    }, []);

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
        setSwiperData,
        setSwiper: handleSetSwiper,
        slidePrev: handleSlidePrev,
        slideNext: handleSlideNext,
        slideTo: handleSlideTo,
    };
};
