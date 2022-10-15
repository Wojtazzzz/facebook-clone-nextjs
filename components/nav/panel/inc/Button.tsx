import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    icon: IconDefinition;
    styles?: string;
    isLoading?: boolean;
    callback: () => void;
}

export const Button = ({ label, icon, styles, isLoading = false, callback }: ButtonProps) => {
    return (
        <RoundedButton
            label={label}
            icon={icon}
            styles={clsx(`bg-dark-100 hover:bg-dark-100/60`, isLoading && 'cursor-wait bg-dark-100/60', styles)}
            isLoading={isLoading}
            callback={callback}
        />
    );
};
