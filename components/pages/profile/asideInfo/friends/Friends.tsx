import type { IUserProfile } from '@utils/types';
import { Container } from '../inc/Container';
import { List } from './list/List';

interface FriendsProps extends IUserProfile {}

export const Friends = ({ id }: FriendsProps) => {
    return (
        <Container testId="asideInfo-friends" title="Friends">
            <List id={id} />
        </Container>
    );
};
