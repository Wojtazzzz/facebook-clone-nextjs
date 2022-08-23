import { useFormikContext } from 'formik';
import { LikeButton } from '@components/chat/panel/sendMessage/button/LikeButton';
import { SendMessageButton } from '@components/chat/panel/sendMessage/button/SendMessageButton';
import type { IChatMessagePayload } from '@utils/types';

export const Button = () => {
    const { values } = useFormikContext<IChatMessagePayload>();

    if (!!values.text) {
        return <SendMessageButton />;
    }

    return <LikeButton />;
};
