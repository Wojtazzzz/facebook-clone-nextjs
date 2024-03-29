import Link from 'next/link';
import { Container } from '../inc/Container';
import { Header } from '../inc/Header';
import { List } from './list/List';

interface FriendsProps {
    userId: number;
}

export const Friends = ({ userId }: FriendsProps) => {
    const headingId = 'asideInfo-friends-heading';

    return (
        <Container testId="asideInfo-friends">
            <section aria-labelledby={headingId}>
                <Header headingId={headingId} title="Friends">
                    <Link href={`/profile/${userId}/friends`}>
                        <a className="text-primary-light hover:underline">See All Friends</a>
                    </Link>
                </Header>

                <List userId={userId} />
            </section>
        </Container>
    );
};
