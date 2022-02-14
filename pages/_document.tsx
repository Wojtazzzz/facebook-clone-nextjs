import { Html, Head, Main, NextScript } from 'next/document';


export default function Document() {
    return (
        <Html lang="pl">
            <Head />

            <body className="max-h-screen overflow-hidden bg-dark-300">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}