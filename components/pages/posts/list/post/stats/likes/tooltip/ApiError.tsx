import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

export const ApiError = () => {
    return <FontAwesomeIcon data-testid="likes-apiError" icon={faFaceSadTear} className="text-xl text-red-400" />;
};
