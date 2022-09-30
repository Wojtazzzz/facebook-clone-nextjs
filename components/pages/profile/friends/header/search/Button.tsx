import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
    label: string;
    icon: IconDefinition;
    callback: () => void;
}

export const Button = ({ label, icon, callback }: ButtonProps) => {
    return (
        <button type="button" aria-label={label} onClick={callback}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
};
