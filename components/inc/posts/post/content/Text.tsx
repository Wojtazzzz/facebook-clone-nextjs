interface TextProps {
    content?: string;
}

export const Text = ({ content }: TextProps) => {
    if (!content) return null;

    return (
        <section aria-label="Content" className="px-4">
            <span className="text-light-100 tracking-tight">{content}</span>
        </section>
    );
};
