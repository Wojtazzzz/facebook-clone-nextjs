import Image from 'next/image';

import { getStoredImagePath } from '@utils/getStoredImagePath';

interface SlideProps {
    image: string;
}

export const Slide = ({ image }: SlideProps) => {
    return (
        <div className="w-full h-full flex justify-center relative">
            <div className="w-2/3 relative">
                <Image layout="fill" src={getStoredImagePath(image)} objectFit="cover" alt="" />
            </div>
        </div>
    );
};
