import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import { NextSeo } from 'next-seo';
import type { ReactElement } from 'react';

const InvitesPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo title="Invites" />
            <Friends type="Invites" />
        </>
    );
};

export default InvitesPage;

InvitesPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
