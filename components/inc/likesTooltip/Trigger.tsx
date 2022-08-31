import * as ReactTooltip from '@radix-ui/react-tooltip';
import type { ReactElement } from 'react';

interface TriggerProps {
    children: ReactElement;
}

export const Trigger = ({ children }: TriggerProps) => {
    return <ReactTooltip.Trigger>{children}</ReactTooltip.Trigger>;
};
