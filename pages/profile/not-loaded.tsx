import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { ErrorLayout } from '@components/layouts/ErrorLayout';
import { NotLoaded } from '@components/pages/profile/NotLoaded';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const ProfileNotLoadedPage: NextPageWithLayout = () => {
    return <NotLoaded />;
};

export default ProfileNotLoadedPage;

ProfileNotLoadedPage.getLayout = (page: ReactElement) => (
    <AuthLayout>
        <ErrorLayout>{page}</ErrorLayout>
    </AuthLayout>
);
