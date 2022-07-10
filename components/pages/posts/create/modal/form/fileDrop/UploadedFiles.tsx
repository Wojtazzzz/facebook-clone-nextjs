import { useFormikContext } from 'formik';

import { File } from '@components/pages/posts/create/modal/form/fileDrop/File';

import { v4 as uuidv4 } from 'uuid';

import type { PostPayload } from '@ctypes/forms/PostPayload';

export const UploadedFiles = () => {
    const {
        values: { images },
    } = useFormikContext<PostPayload>();

    if (!!!images.length) return <></>;

    const ImagesComponents = images.map((file) => <File key={uuidv4()} file={file} />);

    return (
        <ul className="list-disc mb-4">
            <h5 className="text-light-100 font-medium">Uploaded files: {images.length}</h5>
            {ImagesComponents}
        </ul>
    );
};
