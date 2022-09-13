import { useFormikContext } from 'formik';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { RoundedButton } from '@components/inc/RoundedButton';
import type { IChatMessagePayload } from '@utils/types';

export const SendMessageButton = () => {
    const { handleSubmit } = useFormikContext<IChatMessagePayload>();

    return <RoundedButton type="submit" label="Send message" icon={faCircleCheck} callback={handleSubmit} />;
};
