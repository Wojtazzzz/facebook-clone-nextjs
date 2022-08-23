import { useAddToMessage } from './useAddToMessage';

interface EmojiProps {
    emoji: string;
}

export const Emoji = ({ emoji }: EmojiProps) => {
    const { addToMessage } = useAddToMessage();

    const handleAddToMessage = () => addToMessage(emoji);

    return (
        <button
            className="flex justify-center items-center text-2xl p-1 rounded-lg hover:bg-dark-100"
            onClick={handleAddToMessage}
        >
            {emoji}
        </button>
    );
};
