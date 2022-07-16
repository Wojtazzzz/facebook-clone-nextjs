import { useFormikContext } from 'formik';

import Dropzone from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { CloseButton } from '@components/pages/posts/create/modal/form/fileDrop/CloseButton';

import type { IPostPayload } from '@utils/types';

interface FileDropProps {
    handleClose: () => void;
}

export const FileDrop = ({ handleClose }: FileDropProps) => {
    const { values, setFieldValue } = useFormikContext<IPostPayload>();

    const handleCancelUpload = () => {
        handleClose();
        setFieldValue('images', []);
    };

    const handleDrop = (acceptedFiles: File[]) => {
        setFieldValue('images', [...values.images, ...acceptedFiles]);
    };

    return (
        <Dropzone accept="image/*" onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
                <section className="group relative hover:bg-dark-100 border-[1px] border-dark-100 transition-colors active:bg-dark-200 rounded-lg mb-4 py-6">
                    <CloseButton handleClose={handleCancelUpload} />

                    <div {...getRootProps()}>
                        <input {...getInputProps()} aria-label="Images input" />

                        <div className="flex flex-col items-center gap-2">
                            <FontAwesomeIcon icon={faImages} className="text-3xl text-light-200" />

                            <div className="flex flex-col text-light-100 text-center">
                                <span className="text-xl font-medium">Add photos</span>
                                <span className="text-xs">or drag and drop</span>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </Dropzone>
    );
};
