import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/image';

interface SingleImageProps {
    image: string;
}

export const SingleImage = ({ image }: SingleImageProps) => {
    return (
        <div className="w-full min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
            <Image layout="fill" src={getStoredImagePath(image)} alt="" objectFit="cover" />
        </div>
    );
};
