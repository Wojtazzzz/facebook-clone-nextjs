import { memo } from 'react';

import { SingleLoading } from '@components/pages/friends/inc/SingleLoading';
import { ListLoader } from '@components/inc/ListLoader';

interface LoaderProps {
    testid?: string;
}

export const Loader = memo<LoaderProps>(({ testid = '' }) => {
    return (
        <div data-testid={testid}>
            <ListLoader>
                <SingleLoading />
            </ListLoader>
        </div>
    );
});

Loader.displayName = 'Loader';
