import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ClearButtonProps {
    clear: () => void;
}

export const ClearButton = ({ clear }: ClearButtonProps) => {
    return (
        <button aria-label="Clear input" onClick={clear}>
            <FontAwesomeIcon icon={faTimes} className="text-md" />
        </button>
    );
};
