import * as ReactTooltip from '@radix-ui/react-tooltip';
import type { ILike } from '@utils/types';
import type { ReactElement } from 'react';
import { Tooltip } from './tooltip/Tooltip';
import { Trigger } from './Trigger';

interface LikesTooltipProps {
    isOpen: boolean;
    toggle: (state: boolean) => void;
    data: ILike[] | undefined;
    isLoading: boolean;
    isError: boolean;
    children: ReactElement;
}

export const LikesTooltip = ({ isOpen, toggle, children, ...props }: LikesTooltipProps) => {
    return (
        <ReactTooltip.Root onOpenChange={toggle} delayDuration={300} open={isOpen}>
            <Trigger>{children}</Trigger>
            <Tooltip {...props} />
        </ReactTooltip.Root>
    );
};
