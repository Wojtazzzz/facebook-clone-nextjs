import { ActionButton } from '@components/pages/posts/post/comments/inc/ActionButton';

interface LikeActionProps {}

export const LikeAction = ({}: LikeActionProps) => {
    return <ActionButton title="Like" callback={() => alert('Coming soon!')} />;
};
