import { useAuth } from '@hooks/useAuth';

import { Form } from '@components/inc/modals/createPost/form/Form';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';

export const ModalContent = () => {
    const { user } = useAuth();

    if (!user) return <SpinnerLoader testid="modalContent-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <div className="p-4">
            <Form />
        </div>
    );
};
