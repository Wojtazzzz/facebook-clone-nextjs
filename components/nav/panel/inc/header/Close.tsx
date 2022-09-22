import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CloseProps {
    close: () => void;
}

export const Close = ({ close }: CloseProps) => {
    return (
        <button type="button" aria-label="Close dropdown" className="p-1" onClick={close}>
            <FontAwesomeIcon icon={faTimes} className="text-light-50" />
        </button>
    );
};
