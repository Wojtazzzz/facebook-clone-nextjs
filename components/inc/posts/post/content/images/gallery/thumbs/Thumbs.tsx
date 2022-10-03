import { Thumb } from './Thumb';

interface ThumbsProps {
    images: string[];
    activeIndex: number;
    slideTo: (index: number) => void;
}

export const Thumbs = ({ images, activeIndex, slideTo }: ThumbsProps) => {
    const ThumbsComponents = images.map((image, i) => (
        <Thumb key={i} image={image} isActive={activeIndex === i} slideTo={() => slideTo(i)} />
    ));

    return (
        <ul className="w-2/3 h-[50px] flex justify-center items-center gap-2 absolute bottom-0 left-0 right-0 mx-auto z-[51] mb-6">
            {ThumbsComponents}
        </ul>
    );
};
