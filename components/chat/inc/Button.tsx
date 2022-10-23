import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
    type: 'button' | 'submit';
    label: string;
    icon: IconDefinition;
    styles?: string;
    callback?: () => void;
}

export const Button = ({ type, label, icon, styles, callback }: ButtonProps) => {
    return (
        <RoundedButton
            type={type}
            label={label}
            icon={icon}
            styles={`w-[36px] h-[36px] hover:bg-dark-100 ${styles}`}
            callback={callback}
        />
    );
};
