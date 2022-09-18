import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NotLoaded = () => {
    return (
        <button
            type="button"
            aria-label="Loading..."
            title="Loading..."
            disabled
            className="w-[112px] h-full flex flex-col justify-center items-center gap-2 relative cursor-wait"
        >
            <div className="w-full h-full flex justify-center items-center rounded-lg my-1 hover:bg-dark-100">
                <FontAwesomeIcon icon={faUser} className="text-x text-light-100" />
            </div>
        </button>
    );
};
