/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { Container } from '../inc/Container';
import { Header } from '../inc/Header';
import { List } from './list/List';

interface FriendsProps {
    userId: number;
}

export const Friends = ({ userId }: FriendsProps) => {
    return (
        <Container testId="asideInfo-friends">
            <Header title="Friends">
                <Link href={`/profile/${userId}/friends`}>
                    <a className="text-primary hover:underline">See All Friends</a>
                </Link>
            </Header>

            <List userId={userId} />
        </Container>
    );
};
