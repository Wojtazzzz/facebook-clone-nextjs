import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CloseButtonProps {
    close: () => void;
}

export const CloseButton = ({ close }: CloseButtonProps) => {
    return (
        <button
            aria-label="Close upload images"
            className="w-8 h-8 flex justify-center items-center absolute top-2 right-2 bg-dark-100 hover:bg-dark-100/80 group-hover:bg-dark-200 transition-all rounded-full p-3"
            onClick={close}
        >
            <FontAwesomeIcon icon={faTimes} className="text-light-100" />
        </button>
    );
};
