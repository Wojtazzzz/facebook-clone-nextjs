import { useAuth } from '@hooks/useAuth';

import { Link } from '@components/sidebar/inc/Link';
import { LinkLoader } from '@components/sidebar/inc/LinkLoader';
import { Avatar } from '@components/inc/Avatar';

export const UserLink = () => {
    const { user } = useAuth();

    if (!user) return <LinkLoader />;

    return (
        <Link
            title={user.name}
            link={`/profile/${user.id}`}
            icon={<Avatar size={36} src={user.profile_image} alt={user.name} />}
        />
    );
};
