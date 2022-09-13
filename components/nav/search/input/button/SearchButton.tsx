import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SearchButtonProps {
    refetch: () => void;
}

export const SearchButton = ({ refetch }: SearchButtonProps) => {
    return (
        <button type="submit" aria-label="Submit search" onClick={refetch}>
            <FontAwesomeIcon icon={faSearch} className="text-md" />
        </button>
    );
};
