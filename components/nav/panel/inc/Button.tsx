import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface ButtonProps {
    label: string;
    icon: IconDefinition;
    styles?: string;
    isDisabled?: boolean;
    callback: () => void;
}

export const Button = ({ label, icon, styles = '', isDisabled = false, callback }: ButtonProps) => {
    return (
        <RoundedButton
            size="[40px]"
            name={label}
            icon={icon}
            isDisabled={isDisabled}
            onHover="opacity-70"
            styles={styles}
            callback={callback}
        />
    );
};
