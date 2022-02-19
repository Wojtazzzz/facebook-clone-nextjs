import * as React from 'react';

import Head from 'next/head';
import { Provider } from 'react-redux';

import { store } from '@redux/store';
import { config } from '@fortawesome/fontawesome-svg-core';

import type { AppProps } from 'next/app';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import '@styles/global.css';
import '@styles/tailwind.css';
import '@styles/input-autocomplete.css';


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Facebook-clone</title>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider >
        </>
    );
}

export default MyApp;
