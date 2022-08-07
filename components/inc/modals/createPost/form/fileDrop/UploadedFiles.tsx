import { useFormikContext } from 'formik';

import { File } from '@components/inc/modals/createPost/form/fileDrop/File';

import { v4 as uuidv4 } from 'uuid';

import type { IPostPayload } from '@utils/types';

export const UploadedFiles = () => {
    const {
        values: { images },
    } = useFormikContext<IPostPayload>();

    if (!!!images.length) return <></>;

    const ImagesComponents = images.map((file) => <File key={uuidv4()} file={file} />);

    return (
        <ul aria-label="List of uploaded images" className="list-disc mb-4">
            <h5 className="text-light-100 font-medium">Uploaded files: {images.length}</h5>
            {ImagesComponents}
        </ul>
    );
};
