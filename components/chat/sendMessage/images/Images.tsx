import Dropzone from 'react-dropzone';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useUploadImage } from './useUploadImages';
import { Button } from '@components/chat/inc/Button';

export const Images = () => {
    const { onDrop } = useUploadImage();

    return (
        <Dropzone accept="image/*" onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} aria-label="Images" />
                    <Button type="button" label="Add images" icon={faImage} />
                </div>
            )}
        </Dropzone>
    );
};
