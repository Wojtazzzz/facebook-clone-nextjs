/* eslint-disable jsx-a11y/anchor-is-valid */
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
            <section id={headingId}>
                <Header headingId={headingId} title="Friends">
                    <Link href={`/profile/${userId}/friends`}>
                        <a className="text-primary hover:underline">See All Friends</a>
                    </Link>
                </Header>

                <List userId={userId} />
            </section>
        </Container>
    );
};
