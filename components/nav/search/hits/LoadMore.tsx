import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoadMoreProps {
    loadMore: () => void;
}

export const LoadMore = ({ loadMore }: LoadMoreProps) => {
    return (
        <button
            aria-label="Load more results"
            className="w-full flex justify-between items-center gap-3 hover:bg-dark-100 transition-colors rounded-md p-2"
            onClick={loadMore}
        >
            <span className="text-sm text-light-200 font-medium">Load more</span>

            <FontAwesomeIcon icon={faArrowDown} className="text-sm text-light-200" />
        </button>
    );
};
