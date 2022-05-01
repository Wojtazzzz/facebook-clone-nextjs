import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '@components/contacts/inc/Loader';

interface LoadMoreProps {
    isLoading: boolean;
    callback: () => void;
}

export const LoadMore = ({ isLoading, callback }: LoadMoreProps) => {
    if (isLoading) return <Loader />;

    return (
        <button
            title="Load more contacts"
            aria-label="Load more contacts"
            className="w-full flex justify-center items-center gap-5 text-light-200 font-medium hover:bg-dark-100 active:opacity-20 rounded-lg transition-colors cursor-pointer mt-3 py-1 px-5"
            onClick={callback}
        >
            <FontAwesomeIcon icon={faArrowDown} />
        </button>
    );
};
