import { memo } from 'react';

import { SingleLoading } from '@components/pages/friends/shared/SingleLoading';
import { ListLoader } from '@components/ListLoader';

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
