import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from './inc/PanelButton';

interface CommentButtonProps {
    toggleCommentsActive: () => void;
}

export const CommentButton = ({ toggleCommentsActive }: CommentButtonProps) => {
    return <PanelButton title="Comment" icon={faMessage} callback={toggleCommentsActive} />;
};
