import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Marketplace } from '@components/pages/marketplace/Marketplace';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const MarketplacePage: NextPageWithLayout = () => {
    return <Marketplace />;
};

export default MarketplacePage;

MarketplacePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
