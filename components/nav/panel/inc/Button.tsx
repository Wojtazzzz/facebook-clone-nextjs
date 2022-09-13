import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    icon: IconDefinition;
    styles?: string;
    isDisabled?: boolean;
    callback: () => void;
}

export const Button = ({ label, icon, styles, isDisabled = false, callback }: ButtonProps) => {
    return (
        <RoundedButton
            label={label}
            icon={icon}
            styles={clsx(`bg-dark-100 hover:opacity-60 ${styles}`, isDisabled && 'opacity-60')}
            isDisabled={isDisabled}
            callback={callback}
        />
    );
};
