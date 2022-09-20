import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';
import { SendLike } from './SendLike';
import { SubmitMessage } from './SubmitMessage';
import { Input } from './input/Input';

export const Text = () => {
    const { values } = useFormikContext<IChatMessagePayload>();

    const { content, images } = values;

    return (
        <div className="flex items-end gap-1 ml-auto">
            <Input />

            {content || images.length > 0 ? <SubmitMessage /> : <SendLike />}
        </div>
    );
};
