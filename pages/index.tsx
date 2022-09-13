import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { Posts } from '@components/pages/posts/Posts';

export default function Home() {
    return (
        <AuthLayout>
            <Posts />
        </AuthLayout>
    );
}
