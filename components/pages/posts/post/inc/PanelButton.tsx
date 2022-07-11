import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { clsx } from 'clsx';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface PanelButtonProps {
    title: string;
    icon: IconDefinition;
    isActive?: boolean;
    callback: () => void;
}

export const PanelButton = ({ title, icon, isActive = false, callback }: PanelButtonProps) => {
    return (
        <button
            aria-label={title}
            title={title}
            className="w-1/3 flex justify-center items-center gap-1.5 hover:bg-dark-100 rounded-lg py-2"
            onClick={callback}
        >
            <FontAwesomeIcon icon={icon} />

            <span className={clsx('font-medium', isActive && 'text-primary', !isActive && 'text-light-100')}>
                {title}
            </span>
        </button>
    );
};
