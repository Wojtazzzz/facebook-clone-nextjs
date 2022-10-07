import * as ReactTooltip from '@radix-ui/react-tooltip';
import { Emoji } from './Emoji';

interface EmojisProps {
    addToContent: (emoji: string) => void;
    close: () => void;
}

export const Emojis = ({ addToContent, close }: EmojisProps) => {
    const EmojisComponents = availableEmojis.map((emoji, i) => (
        <Emoji key={i} addToContent={addToContent} emoji={emoji} />
    ));

    return (
        <ReactTooltip.Portal>
            <section aria-label="Emojis" className="relative z-40">
                <ReactTooltip.Content
                    onEscapeKeyDown={close}
                    onPointerDownOutside={close}
                    align="end"
                    alignOffset={-32}
                    asChild
                >
                    <div>
                        <ul
                            aria-label="Emojis list"
                            className="w-[250px] md:w-[350px] shadow-lg flex flex-wrap justify-center gap-1.5 bg-dark-200 rounded-lg p-3"
                        >
                            {EmojisComponents}
                        </ul>

                        <ReactTooltip.Arrow width={24} height={12} className="fill-dark-200" />
                    </div>
                </ReactTooltip.Content>
            </section>
        </ReactTooltip.Portal>
    );
};

const availableEmojis = [
    '😃',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '😎',
    '😏',
    '😒',
    '😔',
    '🥺',
    '😢',
    '😭',
    '🤔',
    '😶',
    '🙄',
    '😮',
    '👍',
    '👋',
    '❤️',
    '💔',
];
