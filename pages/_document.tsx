import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" className="scroll-smooth">
            <Head />

            <body className="relative font-sans bg-dark-300 scrollbar-thin scrollbar-thumb-dark-100">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
