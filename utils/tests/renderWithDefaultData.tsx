import { Provider } from 'react-redux';
import * as Tooltip from '@radix-ui/react-tooltip';
import { generateStore } from '@redux/store';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@utils/createQueryClient';

export const renderWithDefaultData = (component: ReactNode) => {
    const store = generateStore();
    const queryClient = createQueryClient();

    return render(
        <Provider store={store}>
            <Tooltip.Provider>
                <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
            </Tooltip.Provider>
        </Provider>
    );
};
