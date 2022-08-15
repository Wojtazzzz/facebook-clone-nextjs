import { ActionButton } from '../ActionButton';

interface LikeActionProps {}

export const LikeAction = ({}: LikeActionProps) => {
    return <ActionButton title="Like" callback={() => alert('Coming soon!')} />;
};
