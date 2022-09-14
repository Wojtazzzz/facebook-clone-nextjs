import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SearchButton = () => {
    return (
        <button type="submit" aria-label="Submit search">
            <FontAwesomeIcon icon={faSearch} className="text-md" />
        </button>
    );
};
