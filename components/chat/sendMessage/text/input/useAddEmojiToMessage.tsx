import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useAddEmojiToMessage = () => {
    const { setValues } = useFormikContext<IChatMessagePayload>();

    const addEmojiToMessage = (emoji: string) => {
        setValues((prevState) => ({
            ...prevState,
            content: prevState.content + emoji,
        }));
    };

    return {
        addEmojiToMessage,
    };
};
