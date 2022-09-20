import Dropzone from 'react-dropzone';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useAddImages } from './useAddImages';
import { Button } from '@components/chat/inc/Button';

export const AddImages = () => {
    const { onDrop } = useAddImages();

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
