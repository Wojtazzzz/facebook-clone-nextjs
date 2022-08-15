import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';

interface ScrollToTopProps {
    scrollDistance: number;
    scroll: () => void;
}

export const ScrollToTop = ({ scrollDistance, scroll }: ScrollToTopProps) => {
    return (
        <button
            aria-label="Scroll page to top"
            title="Scroll page to top"
            className={clsx(
                'w-12 h-12 flex justify-center items-center fixed bottom-16 right-6 z-30 bg-dark-100 transition-opacity hover:opacity-60 rounded-2xl cursor-pointer',
                scrollDistance > 1000 && 'opacity-80',
                scrollDistance < 1000 && 'opacity-0 pointer-events-none'
            )}
            onClick={scroll}
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-2xl text-light-100" />
        </button>
    );
};
