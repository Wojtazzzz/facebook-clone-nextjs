import * as React from 'react';

import Head from 'next/head';
import { Provider } from 'react-redux';

import Echo from 'laravel-echo';
import { config } from '@fortawesome/fontawesome-svg-core';
import { store } from '@redux/store';

import type { AppProps } from 'next/app';

import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import '@styles/global.css';
import '@styles/tailwind.css';
import '@styles/input-autocomplete.css';

function MyApp({ Component, pageProps }: AppProps) {
	React.useEffect(() => {
		window.Pusher = require('pusher-js');

		window.Echo = new Echo({
			broadcaster: 'pusher',
			key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
			cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
			forceTLS: true,
			authEndpoint: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/broadcast`,
		});
	}, []);

	return (
		<>
			<Head>
				<title>Facebook Clone</title>
			</Head>

			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	);
}

export default MyApp;
