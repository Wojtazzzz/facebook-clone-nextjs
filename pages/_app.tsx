import type { AppProps } from 'next/app';

import { Provider } from 'react-redux';
import { Layout } from '@components/Layout';

import { store } from '@redux/store';
import { config } from '@fortawesome/fontawesome-svg-core';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '@styles/tailwind.css';


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
