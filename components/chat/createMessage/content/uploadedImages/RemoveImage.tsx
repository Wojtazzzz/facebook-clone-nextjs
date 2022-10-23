import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RemoveImageProps {
    callback: () => void;
}

export const RemoveImage = ({ callback }: RemoveImageProps) => {
    return (
        <button
            type="button"
            aria-label="Remove image"
            className="w-[22px] h-[22px] flex justify-center items-center absolute -top-2 -right-2 bg-dark-200 text-light-100 shadow-md rounded-full"
            onClick={callback}
        >
            <FontAwesomeIcon icon={faTimes} className="text-xs" />
        </button>
    );
};
