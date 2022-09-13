import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';

interface NavTogglerProps {
    isActive: boolean;
    toggleActive: () => void;
}

export const NavToggler = ({ isActive, toggleActive }: NavTogglerProps) => {
    const label = isActive ? 'Close navigation' : 'Open navigation';
    const icon = isActive ? faTimes : faBars;

    return (
        <RoundedButton
            label={label}
            icon={icon}
            styles="w-[45px] h-[45px] md:hidden fixed bottom-3 right-3 z-40 bg-dark-100"
            callback={toggleActive}
        />
    );
};
