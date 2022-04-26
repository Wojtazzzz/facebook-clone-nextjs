import { RoundedButton } from '@components/inc/RoundedButton';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export const Settings = () => {
    return (
        <RoundedButton
            name="Show post settings"
            icon={faEllipsis}
            size={8}
            bgColor="dark-200"
            onHover="bg-dark-100"
            callback={() => alert('Coming soon!')}
        />
    );
};
