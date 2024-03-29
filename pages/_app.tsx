import { Provider as ReduxProvider } from 'react-redux';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClientProvider } from '@tanstack/react-query';
import { store } from '@redux/store';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { createQueryClient } from '@utils/createQueryClient';
import '@styles/global.css';
import '@styles/tailwind.css';
import type { NextPageWithLayout } from '@utils/types';
import { DefaultSeo } from 'next-seo';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { APP_NAME, APP_URL } from '@utils/env';

const queryClient = createQueryClient();

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <DefaultSeo
                defaultTitle={APP_NAME}
                titleTemplate={`%s - ${APP_NAME}`}
                description={`Create posts, text with friends, share your emotions with others - ${APP_NAME}.`}
                canonical={APP_URL}
                additionalMetaTags={[
                    {
                        name: 'keywords',
                        content:
                            'surfaceapp, surface-app, social, media, socialmedia, friends, pokes, posts, messages, test, chat',
                    },

                    {
                        httpEquiv: 'content-type',
                        content: 'text/html; charset=utf-8',
                    },
                    {
                        name: 'language',
                        content: 'English',
                    },
                ]}
            />

            <ReduxProvider store={store}>
                <QueryClientProvider client={queryClient}>
                    <TooltipProvider>{getLayout(<Component {...pageProps} />)}</TooltipProvider>
                </QueryClientProvider>
            </ReduxProvider>
        </>
    );
}
