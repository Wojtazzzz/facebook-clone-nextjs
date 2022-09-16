import * as RadixPopover from '@radix-ui/react-popover';
import type { IPostType } from '@utils/types';
import { GlobalOptions } from './options/globalOptions/GlobalOptions';
import { Options } from './options/Options';

interface PopoverProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    queryKey: unknown[];
    close: () => void;
    openUpdateModal: () => void;
}

export const Popover = ({ close, ...rest }: PopoverProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content onEscapeKeyDown={close} onInteractOutside={close}>
                <div
                    aria-label="Settings"
                    className="min-w-[180px] md:min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-1 md:py-3 px-2 md:px-4"
                >
                    <Options {...rest} close={close} />

                    <GlobalOptions />
                </div>

                <RadixPopover.Arrow />
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
