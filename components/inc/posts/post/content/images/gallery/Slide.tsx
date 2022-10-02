import Image from 'next/future/image';
import { getStoredImagePath } from '@utils/getStoredImagePath';

interface SlideProps {
    label: string;
    image: string;
}

export const Slide = ({ label, image }: SlideProps) => {
    return (
        <article aria-label={label} className="w-full h-full flex justify-center">
            <div className="w-4/5 md:w-2/3 h-full relative">
                <Image fill src={getStoredImagePath(image)} className="w-full h-full" alt="" />
            </div>
        </article>
    );
};
