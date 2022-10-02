import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';
import { ErrorLayout } from '@components/layouts/ErrorLayout';
import { NotFound } from '@components/pages/notFound/NotFound';

const NotFoundPage: NextPageWithLayout = () => {
    return <NotFound />;
};

export default NotFoundPage;

NotFoundPage.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;
