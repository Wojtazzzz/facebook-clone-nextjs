import clsx from 'clsx';
import { ChooseEmoji } from '../../../../inc/chooseEmoji/ChooseEmoji';
import { useMessageContext } from './useMessageContext';

export const Input = () => {
    const { content, handleBlur, handleChange, addEmojiToMessage } = useMessageContext();

    return (
        <div
            data-testid="message-input-container"
            className={clsx(
                'h-9 flex justify-between items-center rounded-[20px] bg-dark-100 transition-width px-2',
                content.length > 0 ? 'w-52' : 'w-36'
            )}
        >
            <input
                aria-label="Message input"
                type="text"
                name="content"
                placeholder="Aa"
                value={content}
                autoComplete="off"
                className="w-full h-9 bg-transparent text-light-100 focus:outline-none"
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <ChooseEmoji addToContent={addEmojiToMessage} />
        </div>
    );
};
