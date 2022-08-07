import Head from 'next/head';
import { Provider } from 'react-redux';
import * as Tooltip from '@radix-ui/react-tooltip';

import { config } from '@fortawesome/fontawesome-svg-core';
import { store } from '@redux/store';

import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import '@styles/global.css';
import '@styles/tailwind.css';
import '@styles/input-autocomplete.css';

// Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { createQueryClient } from '@utils/createQueryClient';

const queryClient = createQueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Facebook clone</title>
            </Head>

            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Tooltip.Provider>
                        <Component {...pageProps} />
                    </Tooltip.Provider>
                </QueryClientProvider>
            </Provider>
        </>
    );
}
