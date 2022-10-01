import { Provider as ReduxProvider } from 'react-redux';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { generateStore } from '@redux/store';
import { render } from '@testing-library/react';
import type { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@utils/createQueryClient';

export const renderWithDefaultData = (component: ReactNode) => {
    const store = generateStore();
    const queryClient = createQueryClient();

    return render(
        <ReduxProvider store={store}>
            <TooltipProvider>
                <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
            </TooltipProvider>
        </ReduxProvider>
    );
};
