import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import clsx from 'clsx';

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface OptionProps {
    icon: IconDefinition;
    title: string;
    isDisabled?: boolean;
    isActive?: boolean;
    callback?: () => void;
}

export const Option = ({ title, icon, isDisabled = false, isActive = false, callback }: OptionProps) => {
    const handleClick = () => {
        if (!callback) return;
        if (isDisabled || isActive) return;

        callback();
    };

    return (
        <button
            aria-label={title}
            disabled={isDisabled}
            className={clsx(
                'w-full flex items-center hover:bg-dark-200 text-xs md:text-sm text-left text-light-200 font-medium rounded-md transition-colors p-2 px-2 md:px-4',
                isDisabled && 'cursor-not-allowed opacity-40',
                isActive && 'cursor-wait opacity-70'
            )}
            onClick={handleClick}
        >
            <div className="w-3 flex justify-center items-center mr-3">
                <FontAwesomeIcon icon={icon} className="text-lg" />
            </div>

            {title}
        </button>
    );
};
