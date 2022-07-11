import { Provider } from 'react-redux';
import { SWRConfig } from 'swr';

import { generateStore } from '@redux/store';
import { render } from '@testing-library/react';

import type { ReactNode } from 'react';

export const renderWithDefaultData = (component: ReactNode) => {
    const store = generateStore();
    const provider = () => new Map();

    return render(
        <Provider store={store}>
            <SWRConfig value={{ provider }}>{component}</SWRConfig>
        </Provider>
    );
};
