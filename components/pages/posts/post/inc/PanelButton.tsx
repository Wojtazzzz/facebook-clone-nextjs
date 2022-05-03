import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            className={`w-1/3 flex justify-center items-center gap-1.5 ${
                isActive ? 'text-primary' : 'text-light-100'
            } font-medium hover:bg-dark-100 rounded-lg py-2`}
            onClick={callback}
        >
            <FontAwesomeIcon icon={icon} />

            <span>{title}</span>
        </button>
    );
};
