import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { CloseButton } from './CloseButton';
import { useUploadImages } from './useUploadImages';

interface ImageDropProps {
    close: () => void;
}

export const ImageDrop = ({ close }: ImageDropProps) => {
    const { onDrop, cancelUpload } = useUploadImages();

    const handleClose = () => {
        cancelUpload();
        close();
    };

    return (
        <Dropzone accept="image/*" onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <div className="group relative hover:bg-dark-100 border-[1px] border-dark-100 transition-colors active:bg-dark-200 rounded-lg mb-4 py-6">
                    <CloseButton close={handleClose} />

                    <div {...getRootProps()}>
                        <input {...getInputProps()} aria-label="Images input" />

                        <div className="flex flex-col items-center gap-2">
                            <FontAwesomeIcon icon={faImages} className="text-3xl text-light-200" />

                            <div className="flex flex-col text-light-100 text-center">
                                <span className="text-lg md:text-xl font-medium">Add photos</span>
                                <span className="text-xs">or drag and drop</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Dropzone>
    );
};
