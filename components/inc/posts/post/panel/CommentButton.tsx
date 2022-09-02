import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { PanelButton } from './inc/PanelButton';

interface CommentButtonProps {
    handleToggleIsCommentsActive: () => void;
}

export const CommentButton = ({ handleToggleIsCommentsActive }: CommentButtonProps) => {
    return <PanelButton title="Comment" icon={faMessage} callback={handleToggleIsCommentsActive} />;
};
