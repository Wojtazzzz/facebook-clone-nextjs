import { useAuth } from '@hooks/useAuth';

import { Form } from '@components/inc/modals/createPost/form/Form';
import { UserInfo } from '@components/inc/modals/createPost/inc/UserInfo';
import { SpinnerLoader } from '@components/inc/SpinnerLoader';

export const ModalContent = () => {
    const { user } = useAuth();

    if (!user) return <SpinnerLoader testid="modalContent-loader" containerStyles="w-[100px] my-10 mx-auto" />;

    return (
        <div className="p-4">
            <UserInfo user={user} />
            <Form />
        </div>
    );
};
