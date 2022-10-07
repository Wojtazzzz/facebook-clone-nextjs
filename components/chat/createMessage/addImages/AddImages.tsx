import Dropzone from 'react-dropzone';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useAddImages } from './useAddImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AddImages = () => {
    const { onDrop } = useAddImages();

    return (
        <Dropzone accept="image/*" onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <button type="button" aria-label="Add images" {...getRootProps()} onClick={() => console.log('XD')}>
                    <input {...getInputProps()} aria-label="Images" />

                    <div className="w-[36px] h-[36px] hover:bg-dark-100 flex justify-center items-center transition-colors rounded-full p-0">
                        <FontAwesomeIcon icon={faImage} className="text-lg text-light-50" />
                    </div>
                </button>
            )}
        </Dropzone>
    );
};
