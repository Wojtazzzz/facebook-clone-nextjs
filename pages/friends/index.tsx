import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import { NextSeo } from 'next-seo';
import type { ReactElement } from 'react';

const FriendsPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo title="Friends" description="See your list of friends" />
            <Friends type="Friends" />
        </>
    );
};

export default FriendsPage;

FriendsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
