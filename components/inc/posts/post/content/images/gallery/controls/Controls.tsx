import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Control } from './Control';

interface ControlsProps {
    isBeginning: boolean;
    isEnd: boolean;
    slidePrev: () => void;
    slideNext: () => void;
}
export const Controls = ({ isBeginning, isEnd, slidePrev, slideNext }: ControlsProps) => {
    return (
        <>
            <Control
                isDisabled={isBeginning}
                label="Prev image"
                icon={faChevronLeft}
                swiperClass="swiper-button-prev"
                callback={slidePrev}
            />

            <Control
                isDisabled={isEnd}
                label="Next image"
                icon={faChevronRight}
                swiperClass="swiper-button-next"
                callback={slideNext}
            />
        </>
    );
};
