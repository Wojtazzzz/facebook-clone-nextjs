import { useAppDispatch } from '@hooks/redux';

import { Form } from '@components/pages/posts/create/modal/Form';
import { Modal } from '@components/inc/Modal';

import { hideModal } from '@redux/slices/CreatePostModalSlice';

export const CreatePostModal = () => {
    const dispatch = useAppDispatch();

    return (
        <Modal title="Create Post" closeModal={() => dispatch(hideModal())}>
            <Form />
        </Modal>
    );
};
