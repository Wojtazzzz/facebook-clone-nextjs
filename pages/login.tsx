import { GuestLayout } from '@components/layouts/guestLayout/GuestLayout';
import { Auth } from '@components/pages/auth/Auth';
import { NextPageWithLayout } from '@utils/types';
import NextSeo from 'next-seo/lib/meta/nextSEO';
import type { ReactElement } from 'react';

const LoginPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo title="Login Or Create Account" />
            <Auth />;
        </>
    );
};

export default LoginPage;

LoginPage.getLayout = (page: ReactElement) => <GuestLayout>{page}</GuestLayout>;
