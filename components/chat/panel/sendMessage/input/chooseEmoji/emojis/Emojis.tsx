import * as ReactTooltip from '@radix-ui/react-tooltip';
import { Emoji } from './Emoji';

interface EmojisProps {
    close: () => void;
}

export const Emojis = ({ close }: EmojisProps) => {
    const EmojisComponents = availableEmojis.map((emoji, i) => <Emoji key={i} emoji={emoji} />);

    return (
        <ReactTooltip.Portal>
            <ReactTooltip.Content
                onEscapeKeyDown={close}
                onPointerDownOutside={close}
                align="end"
                alignOffset={-32}
                asChild
            >
                <div className="w-[350px] z-40 shadow-lg bg-dark-200 rounded-lg p-3">
                    <div aria-label="Emojis list" className="w-full h-full flex flex-wrap justify-start gap-1.5">
                        {EmojisComponents}
                    </div>

                    <ReactTooltip.Arrow width={24} height={12} className="fill-dark-200" />
                </div>
            </ReactTooltip.Content>
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
