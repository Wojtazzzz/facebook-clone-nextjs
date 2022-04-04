import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IconProp } from '@fortawesome/fontawesome-svg-core';

interface RoundedButtonProps {
    name: string;
    icon: IconProp;
    size?: number;
    bgColor?: string;
    onHover?: string;
    callback: (arg: any) => void;
}

export const RoundedButton = ({
    name,
    icon,
    size = 10,
    bgColor = 'dark-100',
    onHover = 'bg-dark-200',
    callback,
}: RoundedButtonProps) => {
    return (
        <button
            aria-label={name}
            title={name}
            className={`w-${size} h-${size} flex justify-center items-center bg-${bgColor} hover:${onHover} transition-all rounded-full p-3`}
            onClick={callback}
        >
            <FontAwesomeIcon icon={icon} className="text-lg text-light-50" />
        </button>
    );
};
