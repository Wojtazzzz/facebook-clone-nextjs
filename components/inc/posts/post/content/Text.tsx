interface TextProps {
    content?: string;
}

export const Text = ({ content }: TextProps) => {
    if (!content) return null;

    return (
        <div className="px-2 md:px-3">
            <span className="text-light-100 tracking-tight">{content}</span>
        </div>
    );
};
