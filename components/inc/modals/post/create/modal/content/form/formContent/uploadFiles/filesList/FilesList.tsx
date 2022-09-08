import { useFormikContext } from 'formik';
import { File } from './file/File';
import { v4 as uuidv4 } from 'uuid';
import type { IPostCreatePayload } from '@utils/types';

export const FilesList = () => {
    const {
        values: { images },
    } = useFormikContext<IPostCreatePayload>();

    if (!!!images.length) return null;

    const ImagesComponents = images.map((file) => <File key={uuidv4()} file={file} />);

    return (
        <div data-testid="uploaded-files">
            <h5 className="text-light-100 font-medium">Uploaded files: {images.length}</h5>

            <ul aria-label="List of uploaded files" className="list-disc mb-4">
                {ImagesComponents}
            </ul>
        </div>
    );
};
