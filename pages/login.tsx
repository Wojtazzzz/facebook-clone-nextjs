import { GuestLayout } from '@components/layouts/guestLayout/GuestLayout';
import { Auth } from '@components/pages/auth/Auth';
import { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const LoginPage: NextPageWithLayout = () => {
    return <Auth />;
};

export default LoginPage;

LoginPage.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;
