import * as React from 'react';
import { useAuth } from '@hooks/useAuth';

import { Provider } from 'react-redux';
import { UserLayout } from '@components/layouts/UserLayout';
import { GuestLayout } from '@components/layouts/GuestLayout';

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
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider >
    );
}

export default MyApp;
