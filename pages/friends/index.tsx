import { AuthLayout } from '@components/layouts/AuthLayout';
import { Friends } from '@components/pages/friends/Friends';

export default function FriendsPage() {
    return (
        <AuthLayout>
            <Friends />
        </AuthLayout>
    );
}
