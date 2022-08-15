import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ApiError = () => {
    return (
        <div data-testid="like-apiError" className="w-1/3 flex justify-center items-center">
            <FontAwesomeIcon icon={faFaceSadTear} className="text-2xl text-red-400" />
        </div>
    );
};
