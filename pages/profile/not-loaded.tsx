import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { ErrorLayout } from '@components/layouts/ErrorLayout';
import { NotLoaded } from '@components/pages/profile/index/NotLoaded';
import type { NextPageWithLayout } from '@utils/types';
import { NextSeo } from 'next-seo';
import type { ReactElement } from 'react';

const ProfileNotLoadedPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo title="Not Loaded" description="xxx" />
            <NotLoaded />;
        </>
    );
};

export default ProfileNotLoadedPage;

ProfileNotLoadedPage.getLayout = (page: ReactElement) => (
    <AuthLayout>
        <ErrorLayout>{page}</ErrorLayout>
    </AuthLayout>
);
