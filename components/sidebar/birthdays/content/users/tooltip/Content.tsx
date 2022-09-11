import * as RadixTooltip from '@radix-ui/react-tooltip';
import type { IBirthday } from '@utils/types';
import { SingleUser } from './SingleUser';

interface ContentProps {
    birthdays: IBirthday[];
}

export const Content = ({ birthdays }: ContentProps) => {
    const SingleUsersComponents = birthdays.map((birthday) => <SingleUser key={birthday.id} {...birthday} />);

    return (
        <RadixTooltip.Portal>
            <RadixTooltip.Content data-testid="birthday-tooltip" className="flex flex-col bg-dark-200 rounded-lg p-3">
                {SingleUsersComponents}

                <RadixTooltip.Arrow className="fill-dark-200" />
            </RadixTooltip.Content>
        </RadixTooltip.Portal>
    );
};
