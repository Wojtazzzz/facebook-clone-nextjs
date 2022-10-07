import * as RadixPopover from '@radix-ui/react-popover';
import type { QueryKey } from '@tanstack/react-query';
import type { IPostType } from '@utils/types';
import { GlobalOptions } from './options/globalOptions/GlobalOptions';
import { Options } from './options/Options';

interface PopoverProps {
    postId: number;
    type: IPostType;
    commenting: boolean;
    queryKey: QueryKey;
    close: () => void;
    openUpdateModal: () => void;
}

export const Popover = ({ close, ...rest }: PopoverProps) => {
    return (
        <RadixPopover.Portal>
            <RadixPopover.Content aria-label="Settings" onEscapeKeyDown={close} onInteractOutside={close}>
                <ul
                    data-testid="settings-list"
                    role="menu"
                    className="min-w-[180px] md:min-w-[240px] absolute right-0 z-20 bg-dark-300 shadow-md rounded-xl py-1 md:py-3 px-2 md:px-4"
                >
                    <Options {...rest} close={close} />

                    <GlobalOptions />
                </ul>

                <RadixPopover.Arrow />
            </RadixPopover.Content>
        </RadixPopover.Portal>
    );
};
