import Image from 'next/future/image';
import { getStoredImagePath } from '@utils/getStoredImagePath';

interface SlideProps {
    image: string;
}

export const Slide = ({ image }: SlideProps) => {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-4/5 md:w-2/3 h-full relative">
                <Image fill src={getStoredImagePath(image)} className="w-full h-full" alt="" />
            </div>
        </div>
    );
};
