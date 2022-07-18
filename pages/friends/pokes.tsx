import { AuthLayout } from '@components/layouts/AuthLayout';
import { Friends } from '@components/pages/friends/Friends';

export default function PokesPage() {
    return (
        <AuthLayout>
            <Friends type="Pokes" />
        </AuthLayout>
    );
}
