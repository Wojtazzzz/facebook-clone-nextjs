import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useAddEmojiToComment = () => {
    const { setValues } = useFormikContext<IChatMessagePayload>();

    const addToComment = (emoji: string) => {
        setValues((prevState) => ({
            ...prevState,
            content: prevState.content + emoji,
        }));
    };

    return {
        addToComment,
    };
};
