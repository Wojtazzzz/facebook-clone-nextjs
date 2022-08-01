import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';

export const ApiError = () => {
    return <FontAwesomeIcon icon={faFaceSadTear} className="text-xl text-red-400" />;
};
