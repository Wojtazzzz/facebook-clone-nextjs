import { Thumb } from './Thumb';

interface ThumbsProps {
    images: string[];
    activeIndex: number;
    slideTo: (index: number) => void;
}

export const Thumbs = ({ images, activeIndex, slideTo }: ThumbsProps) => {
    const ThumbsComponents = images.map((image, i) => (
        <Thumb key={i} image={image} isActive={activeIndex === i} index={i + 1} slideTo={() => slideTo(i)} />
    ));

    return (
        <section
            role="group"
            aria-label="Choose slide to display"
            data-testid="gallery-thumbs"
            className="w-full md:w-2/3 flex flex-wrap justify-center items-center gap-2 absolute bottom-4 left-0 right-0 mx-auto z-[51] mb-12 md:mb-6 px-5 md:px-0"
        >
            {ThumbsComponents}
        </section>
    );
};
