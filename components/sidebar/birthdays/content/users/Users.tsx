import type { IBirthday } from '@utils/types';
import { DouleBirthday } from './DoubleBirthday';
import { SingleBirthday } from './SingleBirthday';
import { Tooltip } from './tooltip/Tooltip';
import { UserLink } from './UserLink';

interface UsersProps {
    birthdays: IBirthday[];
}

export const Users = ({ birthdays }: UsersProps) => {
    if (birthdays.length === 1) {
        return <SingleBirthday birthday={birthdays[0]} />;
    }

    if (birthdays.length === 2) {
        return <DouleBirthday birthdays={birthdays} />;
    }

    const restBirthdays = birthdays.filter((birthday, i) => i > 1);

    return (
        <span>
            <UserLink id={birthdays[0].id} name={birthdays[0].name} />
            ,&nbsp;
            <UserLink id={birthdays[1].id} name={birthdays[1].name} />
            &nbsp;and&nbsp;
            <Tooltip birthdays={restBirthdays} />
            &apos;s birthday is today.
        </span>
    );
};
