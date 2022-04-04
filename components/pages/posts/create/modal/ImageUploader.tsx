import Dropzone, { DropEvent, FileRejection } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ImageUploaderProps {
    handleDrop: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
    handleClose: () => void;
}

export const ImageUploader = ({ handleDrop, handleClose }: ImageUploaderProps) => {
    return (
        <Dropzone accept="image/*" onDrop={handleDrop}>
            {({ isDragActive, isDragReject, getRootProps, getInputProps }) => {
                if (isDragActive) {
                    return <span>This file is authorized</span>;
                }

                if (isDragReject) {
                    return <span>This file is not authorized</span>;
                }

                return (
                    <section className="group relative hover:bg-dark-100 border-[1px] border-dark-100 transition-colors active:bg-dark-200 rounded-lg mx-4 py-6">
                        <button
                            className="w-8 h-8 flex justify-center items-center absolute top-2 right-2 bg-dark-100 hover:opacity-80 group-hover:bg-dark-200 rounded-full p-3"
                            onClick={handleClose}
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-light-100" />
                        </button>

                        <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            <div className="flex flex-col items-center gap-2">
                                <FontAwesomeIcon icon={faImages} className="text-3xl text-light-200" />

                                <div className="flex flex-col text-light-100 text-center">
                                    <span className="text-xl font-medium">Add photos</span>
                                    <span className="text-xs">or drag and drop</span>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            }}
        </Dropzone>
    );
};
