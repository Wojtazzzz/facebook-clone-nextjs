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
                'w-[35px] md:w-[45px] h-[35px] md:h-[45px] flex justify-center items-center fixed bottom-3 left-3 lg:left-[unset] md:right-3 z-30 bg-dark-100 border-light-100/20 border-[1px] transition-opacity ease-out duration-300 hover:opacity-100 rounded-xl',
                scrollDistance >= 1000 ? 'opacity-50' : 'opacity-0 pointer-events-none'
            )}
            onClick={scroll}
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-lg md:text-xl text-light-100" />
        </button>
    );
};
