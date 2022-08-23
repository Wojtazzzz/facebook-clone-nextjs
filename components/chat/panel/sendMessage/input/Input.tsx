import { useFormikContext } from 'formik';
import clsx from 'clsx';
import { ChooseEmoji } from './chooseEmoji/ChooseEmoji';

type MessageForm = {
    text: string;
};

export const Input = () => {
    const { values, handleBlur, handleChange } = useFormikContext<MessageForm>();

    return (
        <div
            data-testid="message-input-container"
            className={clsx(
                'h-9 flex justify-between items-center rounded-[20px] bg-dark-100 transition-width px-2',
                !!values.text.length ? 'w-52' : 'w-36'
            )}
        >
            <input
                autoFocus
                aria-label="Message input"
                type="text"
                name="text"
                placeholder="Aa"
                value={values.text}
                autoComplete="off"
                className="w-full h-9 bg-transparent text-light-100 focus:outline-none"
                onChange={handleChange}
                onBlur={handleBlur}
            />

            <ChooseEmoji />
        </div>
    );
};
