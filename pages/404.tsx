import type { NextPageWithLayout } from '@utils/types';
import type { ReactElement } from 'react';
import { ErrorLayout } from '@components/layouts/ErrorLayout';
import { NotFound } from '@components/pages/notFound/NotFound';
import { NextSeo } from 'next-seo';

const NotFoundPage: NextPageWithLayout = () => {
    return (
        <>
            <NextSeo title="Not Found" description="Page not found, check correctness of url" nofollow noindex />

            <NotFound />
        </>
    );
};

export default NotFoundPage;

NotFoundPage.getLayout = (page: ReactElement) => <ErrorLayout>{page}</ErrorLayout>;
