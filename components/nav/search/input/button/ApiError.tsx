import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ApiError = () => {
    return (
        <div data-testid="search-apiError" className="w-1/3 flex justify-center items-center">
            <FontAwesomeIcon icon={faFaceSadTear} className="text-xl text-red-400" />
        </div>
    );
};
