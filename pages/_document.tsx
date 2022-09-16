import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head />

            <body className="relative bg-dark-300 scrollbar-thin scrollbar-thumb-dark-100">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
