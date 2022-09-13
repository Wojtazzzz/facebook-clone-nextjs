import { RoundedButton } from '@components/inc/RoundedButton';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface ToggleMenuProps {
    toggle: () => void;
}

export const ToggleMenu = ({ toggle }: ToggleMenuProps) => {
    return (
        <RoundedButton
            size={10}
            name="Menu"
            icon={faEllipsisVertical}
            onHover="opacity-70"
            styles="lg:hidden"
            callback={toggle}
        />
    );
};
