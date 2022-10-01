import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getStoredImagePath } from '@utils/getStoredImagePath';
import NextImage from 'next/future/image';

interface ImageProps {
    remove: (img: string) => void;
    path: string;
}

export const Image = ({ path, remove }: ImageProps) => {
    const handleRemove = () => {
        remove(path);
    };

    return (
        <div
            aria-label="Uploaded image"
            className="w-full h-[300px] relative transition hover:brightness-110 cursor-pointer"
        >
            <NextImage fill src={getStoredImagePath(path)} alt="" className="w-full h-full" />

            <RoundedButton
                label="Remove image"
                icon={faTimes}
                styles="absolute top-2 right-2"
                callback={handleRemove}
            />
        </div>
    );
};