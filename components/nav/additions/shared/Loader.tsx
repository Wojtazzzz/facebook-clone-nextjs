import { memo } from 'react';

import { ListSingleLoader } from '@components/nav/additions/shared/ListSingleLoader';
import { ListLoader } from '@components/ListLoader';

interface LoaderProps {
    testid?: string;
}

export const Loader = memo<LoaderProps>(({ testid = '' }) => {
    return (
        <div data-testid={testid}>
            <ListLoader count={8}>
                <ListSingleLoader />
            </ListLoader>
        </div>
    );
});

Loader.displayName = 'Loader';
