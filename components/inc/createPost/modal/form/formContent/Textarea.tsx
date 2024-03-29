import type { IPostCreatePayload } from '@utils/types';
import { useFormikContext } from 'formik';

export const Textarea = () => {
    const { values, handleChange, handleBlur } = useFormikContext<IPostCreatePayload>();

    return (
        <div className="w-full">
            <textarea
                aria-label="Post content"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                placeholder="What's on your mind?"
                className="w-full md:text-lg text-light-100 bg-transparent outline-none resize-none scrollbar-thin scrollbar-thumb-dark-200 p-3"
            ></textarea>
        </div>
    );
};
