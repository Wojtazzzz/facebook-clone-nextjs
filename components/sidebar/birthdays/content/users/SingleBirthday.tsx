import type { IBirthday } from '@utils/types';
import { UserLink } from './UserLink';

interface SingleBirthdayProps {
    birthday: IBirthday;
}

export const SingleBirthday = ({ birthday }: SingleBirthdayProps) => {
    return (
        <span>
            <UserLink id={birthday.id} name={birthday.name} />
            &apos;s birthday is today.
        </span>
    );
};
