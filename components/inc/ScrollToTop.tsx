import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import { useScrollWindow } from '@hooks/useScrollWindow';

export const ScrollToTop = () => {
    const { scrollDistance, scroll } = useScrollWindow();

    return (
        <button
            aria-label="Scroll page to top"
            aria-disabled={scrollDistance < 1000}
            className={clsx(
                'w-12 h-12 flex justify-center items-center fixed bottom-6 right-6 z-30 bg-dark-100 transition-opacity ease-out duration-300 hover:opacity-100 rounded-xl',
                scrollDistance >= 1000 ? 'opacity-50' : 'opacity-0 pointer-events-none'
            )}
            onClick={scroll}
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-2xl text-light-100" />
        </button>
    );
};
