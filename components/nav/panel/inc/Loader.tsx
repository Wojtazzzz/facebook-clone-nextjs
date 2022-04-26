import { memo } from 'react';

import { ListSingleLoader } from '@components/nav/panel/inc/ListSingleLoader';
import { ListLoader } from '@components/inc/ListLoader';

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
