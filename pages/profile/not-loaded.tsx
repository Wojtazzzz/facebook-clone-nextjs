import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { NotLoaded } from '@components/pages/profile/NotLoaded';

export default function ProfileNotLoaded() {
    return (
        <AuthLayout>
            <NotLoaded />
        </AuthLayout>
    );
}
