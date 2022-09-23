import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

interface ButtonProps {
    label: string;
    icon: IconDefinition;
    styles?: string;
    isDisabled?: boolean;
    withAlert?: boolean;
    callback: () => void;
}

export const Button = ({ label, icon, styles, isDisabled = false, withAlert = false, callback }: ButtonProps) => {
    return (
        <div className="relative">
            <RoundedButton
                label={label}
                icon={icon}
                styles={clsx(`bg-dark-100 hover:opacity-60 ${styles}`, isDisabled && 'opacity-60')}
                isDisabled={isDisabled}
                callback={callback}
            />

            {withAlert && (
                <div
                    data-testid="alert"
                    className="w-[15px] h-[15px] flex justify-center items-center absolute -top-0 -right-0.5 rounded-full bg-dark-100 "
                >
                    <div className="w-[12px] h-[12px] rounded-full bg-red-600"></div>
                </div>
            )}
        </div>
    );
};
