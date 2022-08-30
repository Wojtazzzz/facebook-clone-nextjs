import { ActionButton } from './ActionButton';

interface ReplyActionProps {}

export const ReplyAction = ({}: ReplyActionProps) => {
    return <ActionButton title="Reply" callback={() => alert('Coming soon!')} />;
};
