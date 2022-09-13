import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clsx } from 'clsx';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface RoundedButtonProps {
    label: string;
    icon: IconDefinition;
    type?: 'button' | 'submit';
    isDisabled?: boolean;
    styles?: string;
    iconStyles?: string;
    callback: () => void;
}

export const RoundedButton = ({
    label,
    icon,
    type = 'button',
    isDisabled = false,
    styles = '',
    iconStyles = '',
    callback,
}: RoundedButtonProps) => {
    return (
        <button
            type={type}
            aria-label={label}
            disabled={isDisabled}
            className={clsx(
                `w-[40px] h-[40px] flex justify-center items-center  transition-all rounded-full p-0 ${styles}`,
                isDisabled && 'cursor-not-allowed'
            )}
            onClick={callback}
        >
            <FontAwesomeIcon icon={icon} className={`text-lg text-light-50 ${iconStyles}`} />
        </button>
    );
};
