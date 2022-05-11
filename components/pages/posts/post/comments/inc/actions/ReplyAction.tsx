import { ActionButton } from '@components/pages/posts/post/comments/inc/ActionButton';

interface ReplyActionProps {}

export const ReplyAction = ({}: ReplyActionProps) => {
    return <ActionButton title="Reply" callback={() => alert('Coming soon!')} />;
};
