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
            styles="w-[45px] h-[45px] lg:hidden fixed bottom-3 right-3 z-40 bg-dark-100"
            callback={toggle}
        />
    );
};