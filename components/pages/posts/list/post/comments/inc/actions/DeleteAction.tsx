import { ActionButton } from '../ActionButton';

interface DeleteActionProps {}

export const DeleteAction = ({}: DeleteActionProps) => {
    return <ActionButton title="Delete" callback={() => console.log()} />;
};
