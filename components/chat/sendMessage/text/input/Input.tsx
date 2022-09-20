import { IChatMessagePayload } from '@utils/types';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { ChooseEmoji } from '../../../../inc/chooseEmoji/ChooseEmoji';
import { UploadedImages } from './uploadedImages/UploadedImages';
import { useAddEmojiToMessage } from './useAddEmojiToMessage';

export const Input = () => {
    const { values, handleBlur, handleChange } = useFormikContext<IChatMessagePayload>();
    const { addEmojiToMessage } = useAddEmojiToMessage();

    const { content, images } = values;

    return (
        <div
            data-testid="message-input-container"
            className={clsx(
                'h-9 flex flex-col justify-end rounded-[20px] bg-dark-100 relative transition-width duration-200',
                content || images.length ? 'w-52' : 'w-36',
                images.length > 0 ? 'h-[100px]' : 'h-9'
            )}
        >
            <UploadedImages />

            <div className="w-full h-9 flex items-center justify-between p-2">
                <input
                    aria-label="Message input"
                    type="text"
                    name="content"
                    placeholder="Aa"
                    value={content}
                    autoComplete="off"
                    className="w-full h-full bg-transparent text-light-100 focus:outline-none px-1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                />

                <ChooseEmoji addToContent={addEmojiToMessage} />
            </div>
        </div>
    );
};
