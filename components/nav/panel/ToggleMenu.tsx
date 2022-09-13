import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Button } from './inc/Button';

interface ToggleMenuProps {
    toggle: () => void;
}

export const ToggleMenu = ({ toggle }: ToggleMenuProps) => {
    return <Button label="Menu" icon={faEllipsisVertical} styles="lg:hidden" callback={toggle} />;
};
