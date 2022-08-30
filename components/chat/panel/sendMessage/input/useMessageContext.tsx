import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useMessageContext = () => {
    const { values, handleBlur, handleChange, setValues } = useFormikContext<IChatMessagePayload>();

    const addEmojiToMessage = (emoji: string) => {
        setValues((prevState) => ({
            ...prevState,
            content: prevState.content + emoji,
        }));
    };

    return {
        content: values.content,
        handleBlur,
        handleChange,
        setValues,
        addEmojiToMessage,
    };
};
