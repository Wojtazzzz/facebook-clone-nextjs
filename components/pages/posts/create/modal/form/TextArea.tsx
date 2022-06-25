import type { ChangeEvent } from 'react';

interface TextAreaProps {
    handleChange: (event: ChangeEvent) => void;
    handleBlur: (event: ChangeEvent) => void;
    value: string;
}

export const TextArea = ({ handleChange, handleBlur, value }: TextAreaProps) => {
    return (
        <div className="w-full">
            <textarea
                aria-label="Post content"
                name="content"
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                placeholder="What's on your mind?"
                className="w-full text-lg text-light-100 bg-transparent outline-none resize-none scrollbar-thin scrollbar-thumb-dark-200 p-3"
            ></textarea>
        </div>
    );
};
