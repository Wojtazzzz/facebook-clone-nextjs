import type { IPostUpdatePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const Textarea = () => {
    const { values, handleChange, handleBlur } = useFormikContext<IPostUpdatePayload>();

    return (
        <div className="w-full">
            <textarea
                aria-label="Post content"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                placeholder="What's on your mind?"
                className="w-full min-h-[150px] text-lg text-light-100 resize-none bg-transparent scrollbar-thin scrollbar-track-dark-100 outline-none p-3"
            ></textarea>
        </div>
    );
};
