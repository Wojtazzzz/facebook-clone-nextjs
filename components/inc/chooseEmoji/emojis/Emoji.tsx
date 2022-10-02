interface EmojiProps {
    emoji: string;
    addToContent: (emoji: string) => void;
}

export const Emoji = ({ emoji, addToContent }: EmojiProps) => {
    const handleAddToContent = () => addToContent(emoji);

    return (
        <button
            aria-label={`Add ${emoji} to content`}
            className="flex justify-center items-center md:text-2xl p-1 rounded-lg hover:bg-dark-100"
            onClick={handleAddToContent}
        >
            {emoji}
        </button>
    );
};
