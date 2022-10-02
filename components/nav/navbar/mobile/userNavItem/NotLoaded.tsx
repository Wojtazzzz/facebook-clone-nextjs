import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NotLoaded = () => {
    return (
        <button
            type="button"
            aria-label="Wait for server response"
            aria-disabled="true"
            disabled
            className="w-full h-[50px] flex items-center gap-3 border-b-dark-200 border-b-2 px-4 cursor-wait"
        >
            <div className="w-[26px]">
                <FontAwesomeIcon className="text-xl text-light-100" icon={faUser} />
            </div>

            <span className="text-lg text-light-100">Profile</span>
        </button>
    );
};
