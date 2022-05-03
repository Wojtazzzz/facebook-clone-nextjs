import Head from 'next/head';
import { Provider } from 'react-redux';
import { config } from '@fortawesome/fontawesome-svg-core';
import { store } from '@redux/store';

import type { AppProps } from 'next/app';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import '@styles/global.css';
import '@styles/tailwind.css';
import '@styles/input-autocomplete.css';

// Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Facebook clone</title>
            </Head>

            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
