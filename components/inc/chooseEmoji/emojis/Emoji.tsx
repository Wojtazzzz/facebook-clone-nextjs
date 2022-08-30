interface EmojiProps {
    emoji: string;
    addToContent: (emoji: string) => void;
}

export const Emoji = ({ emoji, addToContent }: EmojiProps) => {
    const handleAddToContent = () => addToContent(emoji);

    return (
        <button
            className="flex justify-center items-center text-2xl p-1 rounded-lg hover:bg-dark-100"
            onClick={handleAddToContent}
        >
            {emoji}
        </button>
    );
};
