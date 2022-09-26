import { AuthLayout } from '@components/layouts/authLayout/AuthLayout';
import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const MarketplacePage: NextPageWithLayout = () => {
    return (
        <AuthLayout>
            <div className="w-full text-center py-8">
                <span className="text-4xl text-gray-400 font-medium">Coming soon!</span>
            </div>
        </AuthLayout>
    );
};

export default MarketplacePage;

MarketplacePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
