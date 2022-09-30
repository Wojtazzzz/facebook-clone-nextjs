import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/future/image';

interface SingleImageProps {
    image: string;
}

export const SingleImage = ({ image }: SingleImageProps) => {
    return (
        <div className="w-full min-h-[300px] relative transition hover:brightness-110 cursor-pointer">
            <Image fill src={getStoredImagePath(image)} alt="" className="w-full h-full" />
        </div>
    );
};
