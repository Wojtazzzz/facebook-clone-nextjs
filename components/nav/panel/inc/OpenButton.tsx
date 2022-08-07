import { RoundedButton } from '@components/inc/RoundedButton';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface OpenButtonProps {
    name: string;
    icon: IconDefinition;
    callback: () => void;
}

export const OpenButton = ({ name, icon, callback }: OpenButtonProps) => {
    return <RoundedButton name={name} icon={icon} onHover="opacity-70" callback={callback} />;
};
