import Head from 'next/head';
import { Provider } from 'react-redux';
import * as Tooltip from '@radix-ui/react-tooltip';
import { config } from '@fortawesome/fontawesome-svg-core';
import { store } from '@redux/store';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createQueryClient } from '@utils/createQueryClient';
import '@styles/global.css';
import '@styles/tailwind.css';
import '@styles/input-autocomplete.css';
// Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type { NextPageWithLayout } from '@utils/types';

config.autoAddCss = false;

const queryClient = createQueryClient();

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <title>Facebook clone</title>
            </Head>

            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Tooltip.Provider>{getLayout(<Component {...pageProps} />)}</Tooltip.Provider>
                </QueryClientProvider>
            </Provider>
        </>
    );
}
