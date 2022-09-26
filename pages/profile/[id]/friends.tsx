import { MainLayout } from '@components/layouts/authLayout/mainLayout/MainLayout';
import { Friends } from '@components/pages/profile/friends/Friends';
import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';

const FriendsPage: NextPageWithLayout = () => {
    return <Friends />;
};

export default FriendsPage;

FriendsPage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
