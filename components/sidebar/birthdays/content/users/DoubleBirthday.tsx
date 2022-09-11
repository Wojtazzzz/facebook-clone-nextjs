import type { IBirthday } from '@utils/types';
import { UserLink } from './UserLink';

interface DouleBirthdayProps {
    birthdays: IBirthday[];
}

export const DouleBirthday = ({ birthdays }: DouleBirthdayProps) => {
    const [first, second] = birthdays;

    return (
        <span>
            <UserLink id={first.id} name={first.name} />
            &nbsp;and&nbsp;
            <UserLink id={second.id} name={second.name} />
            &apos;s birthday is today.
        </span>
    );
};
