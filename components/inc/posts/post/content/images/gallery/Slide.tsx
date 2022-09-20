import Image from 'next/image';
import { getStoredImagePath } from '@utils/getStoredImagePath';

interface SlideProps {
    image: string;
}

export const Slide = ({ image }: SlideProps) => {
    return (
        <div className="w-full h-full flex justify-center">
            <div className="w-4/5 md:w-2/3 h-full relative">
                <Image layout="fill" src={getStoredImagePath(image)} objectFit="fill" alt="" />
            </div>
        </div>
    );
};
