import { useFormikContext } from 'formik';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IPostPayload } from '@utils/types';

interface FileProps {
    file: File;
}

export const File = ({ file }: FileProps) => {
    const { values, setFieldValue } = useFormikContext<IPostPayload>();

    const handleRemove = () => {
        const newImages = values.images.filter((img) => img !== file);
        setFieldValue('images', newImages);
    };

    return (
        <li className="w-full flex justify-between items-center mb-0.5 px-2">
            <span className="text-sm text-light-200">{file.name}</span>

            <button type="button" aria-label={`Remove ${file.name} from updated files list`} onClick={handleRemove}>
                <FontAwesomeIcon icon={faTimes} className="text-red-400" />
            </button>
        </li>
    );
};
