import { faFaceSadTear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface SadSmileErrorProps {
    testId: string;
    size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export const SadSmileError = ({ testId, size = 'base' }: SadSmileErrorProps) => {
    return (
        <div data-testid={testId} className="w-1/3 flex justify-center items-center">
            z
            <FontAwesomeIcon icon={faFaceSadTear} className={`text-${size} text-red-400`} />
        </div>
    );
};
