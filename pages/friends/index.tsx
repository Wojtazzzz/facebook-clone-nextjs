import { UserLayout } from '@components/layouts/UserLayout';
import { FriendsList } from '@components/pages/friends/FriendsList';

export default function FriendsPage() {
    return (
        <UserLayout>
            <FriendsList />
        </UserLayout>
    );
}
