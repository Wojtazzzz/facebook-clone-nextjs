import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const SuggestsPage: NextPageWithLayout = () => {
    return <Friends type="Suggests" />;
};

export default SuggestsPage;

SuggestsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
