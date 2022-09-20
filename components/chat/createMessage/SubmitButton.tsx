import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useCreateMessage } from './useCreateMessage';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/chat/inc/Button';
import { useFormikContext } from 'formik';
import type { IChatMessagePayload } from '@utils/types';

export const SubmitButton = () => {
    const { values } = useFormikContext<IChatMessagePayload>();
    const { content, images } = values;

    if (content || images.length > 0) {
        return <SubmitMessage />;
    }

    return <SendLike />;
};

const SendLike = () => {
    const { sendLike } = useCreateMessage();

    return <Button type="button" label="Send like" icon={faThumbsUp} callback={sendLike} />;
};

export const SubmitMessage = () => {
    return <Button type="submit" label="Submit message" icon={faCircleCheck} />;
};
