import type { IChatMessagePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const useAddToMessage = () => {
    const { setValues } = useFormikContext<IChatMessagePayload>();

    const addToMessage = (emoji: string) => {
        setValues((prevState) => ({
            ...prevState,
            text: prevState.text + emoji,
        }));
    };

    return { addToMessage };
};
