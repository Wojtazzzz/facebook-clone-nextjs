import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Option } from '../../Option';

interface UpdateProps {
    openUpdateModal: () => void;
}

export const Update = ({ openUpdateModal }: UpdateProps) => {
    return <Option title="Update" icon={faEdit} isActive={false} callback={openUpdateModal} />;
};
