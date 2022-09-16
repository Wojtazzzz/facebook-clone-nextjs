import { Author } from '@components/inc/posts/post/header/Author';
import type { IUserProfile } from '@utils/types';
import { Date } from './Date';
import { Share } from './Share';

interface BornAtProps {
    user: IUserProfile;
}

export const BornAt = ({ user }: BornAtProps) => {
    return (
        <article aria-label="Born at" className="w-full bg-dark-200 rounded-lg py-3">
            <Author author={user} createdAt={user.born_at} isEdited={false} />
            <Date date={user.born_at} />
            <Share />
        </article>
    );
};
