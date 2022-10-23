import { getStoredImagePath } from '@utils/getStoredImagePath';
import clsx from 'clsx';
import Image from 'next/future/image';

interface ThumbProps {
    image: string;
    isActive: boolean;
    index: number;
    slideTo: () => void;
}

export const Thumb = ({ image, isActive, index, slideTo }: ThumbProps) => {
    return (
        <button
            type="button"
            aria-label={String(index)}
            aria-disabled={isActive}
            aria-pressed={isActive}
            disabled={isActive}
            className="w-[36px] h-[36px] relative"
            onClick={slideTo}
        >
            <Image
                fill
                sizes="36px"
                src={getStoredImagePath(image)}
                className={clsx(
                    'hover:opacity-100 transition-opacity rounded-lg shadow-md',
                    isActive ? 'opacity-100' : 'opacity-60'
                )}
                alt=""
            />
        </button>
    );
};
