import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchButtonProps {
    focus: () => void;
}

export const SearchButton = ({ focus }: SearchButtonProps) => {
    return (
        <button type="submit" aria-label="Focus input" onClick={focus}>
            <FontAwesomeIcon icon={faSearch} className="text-md" />
        </button>
    );
};
