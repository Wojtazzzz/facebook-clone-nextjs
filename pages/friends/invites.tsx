import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const InvitesPage: NextPageWithLayout = () => {
    return <Friends type="Invites" />;
};

export default InvitesPage;

InvitesPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
