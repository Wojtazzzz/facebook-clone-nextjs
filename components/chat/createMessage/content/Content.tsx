import type { IChatMessagePayload } from '@utils/types';
import clsx from 'clsx';
import { useFormikContext } from 'formik';
import { AddText } from './addText/AddText';
import { UploadedImages } from './uploadedImages/UploadedImages';

export const Content = () => {
    const { values } = useFormikContext<IChatMessagePayload>();

    const { content, images } = values;

    return (
        <section
            aria-label="Message"
            data-testid="message-input-container"
            className={clsx(
                'h-9 flex flex-col justify-end rounded-[20px] bg-dark-100 relative transition-[width] duration-200',
                content || images.length ? 'w-52' : 'w-36',
                images.length > 0 ? 'h-[100px]' : 'h-9'
            )}
        >
            <UploadedImages />
            <AddText />
        </section>
    );
};
