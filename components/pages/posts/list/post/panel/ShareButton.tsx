import { faShare } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from './inc/PanelButton';

interface ShareButtonProps {}

export const ShareButton = ({}: ShareButtonProps) => {
    return <PanelButton title="Share" icon={faShare} callback={() => console.log('Share action..')} />;
};
