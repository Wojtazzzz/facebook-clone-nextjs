import { GuestLayout } from '@components/layouts/GuestLayout';
import { Auth } from '@components/pages/auth/Auth';

export default function Login() {
    return (
        <GuestLayout>
            <Auth />
        </GuestLayout>
    );
}
