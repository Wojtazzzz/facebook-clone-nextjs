import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface OptionProps {
    icon: IconDefinition;
    title: string;
    isDisabled?: boolean;
    isLoading?: boolean;
    callback: () => void;
}

export const Option = ({ title, icon, isDisabled = false, isLoading = false, callback }: OptionProps) => {
    const handleClick = () => {
        if (isDisabled || isLoading) return;

        callback();
    };

    return (
        <li role="menuitem">
            <button
                aria-label={title}
                aria-disabled={isDisabled || isLoading}
                disabled={isDisabled || isLoading}
                className={clsx(
                    'w-full flex items-center hover:bg-dark-200 text-xs md:text-sm text-left text-light-200 font-medium rounded-md transition-all p-2 px-2 md:px-4',
                    isDisabled && 'cursor-not-allowed opacity-40',
                    isLoading && 'cursor-wait opacity-70'
                )}
                onClick={handleClick}
            >
                <div className="w-3 flex justify-center items-center mr-3">
                    <FontAwesomeIcon icon={icon} className="text-lg" />
                </div>

                {title}
            </button>
        </li>
    );
};
