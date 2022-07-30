import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface OptionProps {
    icon: IconDefinition;
    title: string;
    callback: () => void;
}

export const Option = ({ title, icon, callback }: OptionProps) => {
    return (
        <button
            aria-label={title}
            className="w-full flex items-center hover:bg-dark-200 text-sm text-light-200 font-medium rounded-md transition-colors p-2 px-4"
            onClick={callback}
        >
            <div className="w-3 flex justify-center items-center mr-3">
                <FontAwesomeIcon icon={icon} className="text-lg" />
            </div>

            {title}
        </button>
    );
};
