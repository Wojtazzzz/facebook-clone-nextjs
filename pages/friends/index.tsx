import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const FriendsPage: NextPageWithLayout = () => {
    return <Friends type="Friends" />;
};

export default FriendsPage;

FriendsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
