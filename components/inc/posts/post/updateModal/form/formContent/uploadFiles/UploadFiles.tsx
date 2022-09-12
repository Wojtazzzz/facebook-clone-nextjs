import { FileDrop } from './fileDrop/FileDrop';
import { FilesList } from './filesList/FilesList';

interface UploadFilesProps {
    close: () => void;
}

export const UploadFiles = ({ close }: UploadFilesProps) => {
    return (
        <>
            <FileDrop close={close} />
            <FilesList />
        </>
    );
};
