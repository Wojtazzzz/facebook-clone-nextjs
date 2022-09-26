import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const PokesPage: NextPageWithLayout = () => {
    return <Friends type="Pokes" />;
};

export default PokesPage;

PokesPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
