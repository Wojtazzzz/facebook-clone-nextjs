import { Provider as ReduxProvider } from 'react-redux';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@redux/store';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createQueryClient } from '@utils/createQueryClient';
import '@styles/global.css';
import '@styles/tailwind.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type { NextPageWithLayout } from '@utils/types';

const queryClient = createQueryClient();

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <TooltipProvider>{getLayout(<Component {...pageProps} />)}</TooltipProvider>
            </QueryClientProvider>
        </ReduxProvider>
    );
}
