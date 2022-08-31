import * as ReactTooltip from '@radix-ui/react-tooltip';
import type { ILike } from '@utils/types';
import { List } from './list/List';

interface TooltipProps {
    data: ILike[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

export const Tooltip = (props: TooltipProps) => {
    return (
        <ReactTooltip.Portal>
            <ReactTooltip.Content>
                <div data-testid="tooltip" className="flex flex-col gap-3 bg-dark-300 shadow-md rounded-lg p-3">
                    <span className="text-sm text-light-100 font-medium">Likes</span>

                    <List {...props} />
                </div>
            </ReactTooltip.Content>
        </ReactTooltip.Portal>
    );
};
