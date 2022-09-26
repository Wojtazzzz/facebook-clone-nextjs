import { IndexLayout } from '@components/layouts/authLayout/IndexLayout';
import { Posts } from '@components/pages/posts/Posts';
import type { NextPageWithLayout } from '@utils/types';
import { ReactElement } from 'react';

const IndexPage: NextPageWithLayout = () => {
    return <Posts />;
};

export default IndexPage;

IndexPage.getLayout = (page: ReactElement) => <IndexLayout>{page}</IndexLayout>;
