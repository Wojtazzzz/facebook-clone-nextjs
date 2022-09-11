import { File } from './File';
import { v4 as uuidv4 } from 'uuid';
import { useImages } from './useImages';

interface UploadedFilesProps {
    images: string[];
}

export const UploadedFiles = ({ images }: UploadedFilesProps) => {
    const { currentImages, remove } = useImages(images);

    if (!images.length) return null;

    const ImagesComponents = currentImages.map((img) => <File key={uuidv4()} remove={remove} path={img} />);

    return (
        <div
            aria-label="List of already uploaded files"
            className="flex flex-col gap-2 h-full border-1px border-light-100 rounded-xl overflow-y-auto p-3"
        >
            {ImagesComponents}
        </div>
    );
};
