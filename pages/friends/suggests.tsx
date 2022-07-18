import { AuthLayout } from '@components/layouts/AuthLayout';
import { Friends } from '@components/pages/friends/Friends';

export default function SuggestsPage() {
    return (
        <AuthLayout>
            <Friends type="Suggests" />
        </AuthLayout>
    );
}
