import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

interface NavTogglerProps {
    isActive: boolean;
    toggle: () => void;
}

export const NavToggler = ({ isActive, toggle }: NavTogglerProps) => {
    const label = isActive ? 'Close navigation' : 'Open navigation';
    const icon = isActive ? faTimes : faBars;

    return (
        <RoundedButton
            label={label}
            icon={icon}
            styles="w-[35px] md:w-[45px] h-[35px] md:h-[45px] lg:hidden fixed bottom-3 right-3 z-40 bg-dark-100 border-[1px] border-light-100/20"
            iconStyles="!text-sm md:!text-xl"
            callback={toggle}
        />
    );
};
