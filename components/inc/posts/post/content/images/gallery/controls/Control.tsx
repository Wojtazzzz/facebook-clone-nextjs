import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

interface ControlProps {
    label: string;
    icon: IconDefinition;
    isDisabled: boolean;
    swiperClass: 'swiper-button-prev' | 'swiper-button-next';
    callback: () => void;
}

export const Control = ({ label, icon, isDisabled, swiperClass, callback }: ControlProps) => {
    return (
        <RoundedButton
            isDisabled={isDisabled}
            label={label}
            icon={icon}
            styles={clsx(
                "!w-[40px] !h-[40px] md:!w-[48px] md:!h-[48px] bg-dark-100 after:!content-[''] hover:brightness-110",
                isDisabled && 'brightness-110',
                swiperClass
            )}
            iconStyles="text-light-50"
            callback={callback}
        />
    );
};
