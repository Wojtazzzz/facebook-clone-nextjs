import { ChooseEmoji } from '@components/inc/chooseEmoji/ChooseEmoji';
import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';
import { useAddEmojiToMessage } from './co/useAddEmojiToMessage';

export const AddText = () => {
    const { values, handleBlur, handleChange } = useFormikContext<IChatMessagePayload>();
    const { addEmojiToMessage } = useAddEmojiToMessage();

    return (
        <div className="w-full h-9 flex items-center justify-between p-2">
            <input
                aria-label="Message input"
                type="text"
                name="content"
                placeholder="Aa"
                value={values.content}
                autoComplete="off"
                className="w-full h-full bg-transparent text-light-100 focus:outline-none px-1"
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <ChooseEmoji addToContent={addEmojiToMessage} />
        </div>
    );
};
