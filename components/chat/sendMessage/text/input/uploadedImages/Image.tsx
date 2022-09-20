import NextImage from 'next/image';
import { RemoveImage } from './RemoveImage';
import { useRemoveImage } from './useRemoveImage';

interface ImageProps {
    image: File;
}

export const Image = ({ image }: ImageProps) => {
    const remove = useRemoveImage();

    const handleRemoveImage = () => remove(image);

    const src = URL.createObjectURL(image);

    return (
        <div className="w-[48px] h-[48px] relative">
            <NextImage layout="fill" src={src} className="rounded-xl" alt="" />
            <RemoveImage callback={handleRemoveImage} />
        </div>
    );
};
