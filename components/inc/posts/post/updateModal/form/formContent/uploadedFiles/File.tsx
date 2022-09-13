import { RoundedButton } from '@components/inc/RoundedButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { getStoredImagePath } from '@utils/getStoredImagePath';
import Image from 'next/image';

interface FileProps {
    remove: (img: string) => void;
    path: string;
}

export const File = ({ path, remove }: FileProps) => {
    const handleRemove = () => {
        remove(path);
    };

    return (
        <div
            aria-label="Uploaded image"
            className="w-full h-[300px] relative transition hover:brightness-110 cursor-pointer"
        >
            <Image layout="fill" src={getStoredImagePath(path)} alt="" objectFit="cover" />

            <RoundedButton label="Remove file" icon={faTimes} styles="absolute top-2 right-2" callback={handleRemove} />
        </div>
    );
};
