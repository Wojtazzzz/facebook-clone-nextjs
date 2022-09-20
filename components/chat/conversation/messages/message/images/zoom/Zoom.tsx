import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/image';
import { Close } from './Close';

interface ZoomProps {
    image: string;
    close: () => void;
}

export const Zoom = ({ image, close }: ZoomProps) => {
    return (
        <div
            aria-label="Zoom"
            className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-black overflow-hidden"
        >
            <Close close={close} />

            <div className="w-4/5 md:w-2/3 h-full flex justify-center relative z-[51]">
                <Image layout="fill" src={getStoredImagePath(image)} objectFit="fill" alt="" className="z-50" />
            </div>
        </div>
    );
};
