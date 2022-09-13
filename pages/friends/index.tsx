import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { Friends } from '@components/pages/friends/Friends';

export default function FriendsPage() {
    return (
        <AuthLayout>
            <Friends type="Friends" />
        </AuthLayout>
    );
}
