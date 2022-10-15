import { GuestLayout } from '@components/layouts/guestLayout/GuestLayout';
import { Login } from '@components/pages/login/Login';
import type { NextPageWithLayout } from '@utils/types';
import { NextSeo } from 'next-seo';
import type { ReactElement } from 'react';

const LoginPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo title="Login Or Create Account" description="Welcome in Facebook Clone social app" />

            <Login />
        </>
    );
};

export default LoginPage;

LoginPage.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;
