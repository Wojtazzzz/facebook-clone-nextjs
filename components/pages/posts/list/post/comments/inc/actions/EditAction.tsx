import { ActionButton } from '../ActionButton';

interface EditActionProps {
    isEditModeActive: boolean;
    toggleEditMode: () => void;
}

export const EditAction = ({ isEditModeActive, toggleEditMode }: EditActionProps) => {
    return <ActionButton title={isEditModeActive ? 'Close' : 'Edit'} callback={toggleEditMode} />;
};
