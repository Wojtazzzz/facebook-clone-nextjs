import { ActionButton } from '../ActionButton';

interface ReplyProps {}

export const Reply = ({}: ReplyProps) => {
    return <ActionButton title="Reply" callback={() => alert('Coming soon!')} />;
};
