import Image from 'next/future/image';
import { getStoredImagePath } from '@utils/getStoredImagePath';

interface SlideProps {
    image: string;
}

export const Slide = ({ image }: SlideProps) => {
    const path = getStoredImagePath(image);

    return (
        <div
            className="w-screen h-screen flex justify-center bg-no-repeat bg-cover relative z-50"
            style={{ backgroundImage: `url(${path})` }}
        >
            <div className="w-full h-full backdrop-blur-lg z-[51]">
                <div className="w-full md:w-2/3 h-full relative mx-auto">
                    <Image fill src={path} className="object-contain" alt="" />
                </div>
            </div>
        </div>
    );
};
