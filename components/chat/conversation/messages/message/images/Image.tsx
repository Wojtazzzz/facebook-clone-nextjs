import { getStoredImagePath } from '@utils/getStoredImagePath';
import NextImage from 'next/future/image';
import { useZoom } from './useZoom';
import { Zoom } from './zoom/Zoom';

interface ImageProps {
    image: string;
}

export const Image = ({ image }: ImageProps) => {
    const { isActive, open, close } = useZoom();

    return (
        <>
            <button
                aria-label="Zoom image"
                type="button"
                className="w-[200px] h-[150px] relative hover:opacity-80 cursor-pointer"
                onClick={open}
            >
                <NextImage fill src={getStoredImagePath(image)} alt="" className="w-full h-full rounded-xl" />
            </button>

            {isActive && <Zoom image={image} close={close} />}
        </>
    );
};
