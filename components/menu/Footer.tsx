import Link from 'next/link';

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer data-testid="app-footer" className="w-full absolute bottom-1 left-1 text-sm text-light-100">
            <Link href="https://github.com/CubeStorm/">
                <a target="_blank" className="hover:underline">
                    Marcin Witas
                </a>
            </Link>
            &nbsp;· {year}
        </footer>
    );
};
