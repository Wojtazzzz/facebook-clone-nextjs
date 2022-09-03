import { ActionButton } from '../ActionButton';

interface EditProps {
    isEditModeActive: boolean;
    toggleEditMode: () => void;
}

export const Edit = ({ isEditModeActive, toggleEditMode }: EditProps) => {
    return <ActionButton title={isEditModeActive ? 'Close' : 'Edit'} callback={toggleEditMode} />;
};
