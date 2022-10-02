import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRemoveFile } from './useRemoveFile';

interface ImageProps {
    image: File;
}

export const Image = ({ image }: ImageProps) => {
    const { remove } = useRemoveFile();

    const handleRemove = () => {
        remove(image);
    };

    return (
        <li className="w-full flex justify-between items-center mb-0.5 px-2">
            <span className="text-sm text-light-200">{image.name}</span>

            <button type="button" aria-label={`Remove ${image.name} from list`} onClick={handleRemove}>
                <FontAwesomeIcon icon={faTimes} className="text-red-400" />
            </button>
        </li>
    );
};
