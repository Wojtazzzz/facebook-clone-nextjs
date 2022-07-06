import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchButtonProps {
    handleFocus: () => void;
}

export const SearchButton = ({ handleFocus }: SearchButtonProps) => {
    return (
        <button aria-label="Focus input" onClick={handleFocus}>
            <FontAwesomeIcon icon={faSearch} className="text-md" />
        </button>
    );
};
