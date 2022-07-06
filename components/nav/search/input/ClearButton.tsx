import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ClearButtonProps {
    handleClear: () => void;
}

export const ClearButton = ({ handleClear }: ClearButtonProps) => {
    return (
        <button aria-label="Clear input" onClick={handleClear}>
            <FontAwesomeIcon icon={faTimes} className="text-md" />
        </button>
    );
};
