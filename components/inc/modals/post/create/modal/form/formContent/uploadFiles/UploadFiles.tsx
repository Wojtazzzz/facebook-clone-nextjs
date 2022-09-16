import { FileDrop } from './fileDrop/FileDrop';
import { FilesList } from './filesList/FilesList';

interface UploadFilesProps {
    close: () => void;
}

export const UploadFiles = ({ close }: UploadFilesProps) => {
    return (
        <div className="mb-4">
            <FileDrop close={close} />
            <FilesList />
        </div>
    );
};
