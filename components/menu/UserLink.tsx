import { useAuth } from '@hooks/useAuth';
import { Link } from '@components/menu/Link';
import { LinkLoader } from '@components/menu/LinkLoader';
import { Avatar } from '@components/inc/Avatar';

export const UserLink = () => {
    const { user } = useAuth();

    if (!user) return <LinkLoader />;

    const { id, name, profile_image } = user;

    return <Link title={name} link={`/profile/${id}`} icon={<Avatar size={36} src={profile_image} alt={name} />} />;
};
